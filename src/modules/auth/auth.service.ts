import { Injectable, Logger } from '@nestjs/common';
import {
  AuthLoginDto,
  AuthResponseDto,
  ChangePasswordDto,
  CheckLoginReponseDto,
  JwtPayloadDto,
  ResetPasswordDto,
  TokenLoginDto,
  TokenPayloadDto,
} from './dto';
import { UserService } from '../user/user.service';
import { BadRequestException, NotFoundException } from 'src/common/exceptions';
import { AppEnvironmentService } from '../app-environment/app-environment.service';
import { ApiConfigService } from 'src/shared/services/api-config.service';
import { UserAccessService } from '../user-access/user-access.service';
import { ErrorCode } from 'src/common/error-code';
import { AUTH_LOGIN_ACTION, AUTH_LOGIN_TYPE } from './enum';
import * as moment from 'moment';
import { get } from 'lodash';
import { HashHelper } from 'src/common/helpers/hash.helper';
import {
  DEVICE_TYPE,
  IS_ACTIVE_COMMON,
  USER_TOKEN_DELETED_BY_ACTION,
} from 'src/common/enum';
import { EmployeeService } from '../employee/employee.service';
import { Employee } from '../employee/entities/employee.entity';
import { StoreService } from '../store/store.service';
import { JwtService } from '@nestjs/jwt';
import { DateHelper } from 'src/common/helpers';
import { UpdateResult } from 'typeorm';
import { IpConfigurationService } from '../ip-configuration/ip-configuration.service';
import { UserTokenService } from '../user-token/user-token.service';
import { Request } from 'express';
import { UserLoginResponseDto } from '../user/dto';
import { AUTH_LOGIN_TYPE_NAME } from './enum-name';
import { SendResetPasswordDto } from './dto/send-reset-password.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly appEnvironmentService: AppEnvironmentService,
    private readonly apiConfigService: ApiConfigService,
    private readonly userAccessService: UserAccessService,
    private readonly employeeService: EmployeeService,
    private readonly storeService: StoreService,
    private readonly jwtService: JwtService,
    private readonly ipConfigurationService: IpConfigurationService,
    private readonly userTokenService: UserTokenService,
  ) {}

  async verifyLogin(
    authLoginDto: AuthLoginDto,
    clientIp: string,
    req: Request,
  ) {
    //#TODO check black list ip
    //#TODO Get redis data to limit ddos
    const deviceType = Number(req.headers['device-type']) || null;
    const userAgent = req.headers['user-agent'] || '';
    const userAsEntity = await this.userService.getUserByUserNameOrEmail(
      authLoginDto.username,
    );
    const environment = await this.appEnvironmentService.getAllEnviroment();
    await this.handleValidationLogin({
      userAsEntity,
      authLoginDto,
      environment,
    });

    if (this.apiConfigService.IpConfig.check) {
      const { ipValid } = await this.ipConfigurationService.checkValidIp(
        clientIp,
      );
      if (!ipValid) {
        await this.validationUserAccess(userAsEntity, clientIp);
      }
    }
    const roleId = userAsEntity.userRoles[0].roleId;
    const [storeEmployee, listFeature] = await Promise.all([
      this.storeService.getStoreById(userAsEntity.storeId),
      this.userService.getFeaturesNameByRoleId(roleId),
    ]);
    userAsEntity.storeName = storeEmployee ? storeEmployee.name : '';
    userAsEntity.actionMode =
      userAsEntity.actionMode === AUTH_LOGIN_ACTION.LOGIN_AGAIN ? 0 : undefined;

    const jwtPayload = new JwtPayloadDto({
      ...userAsEntity,
      storeId: storeEmployee ? storeEmployee.id : null,
    });

    const { accessToken } = await this.createAccessToken(jwtPayload);
    //trigger update last time login
    await this.updateLastTimeLogin(userAsEntity.id, userAsEntity.actionMode);

    // create user token user
    const jwtDecodeToken = await this.jwtService.verifyAsync(accessToken);
    await this.userTokenService.createUserToken({
      userId: userAsEntity.id,
      token: accessToken,
      permissions: JSON.stringify(listFeature),
      expiredAt: DateHelper.convertTimestampToDateTime(jwtDecodeToken.exp),
      userAgent: userAgent,
      ip: clientIp,
    });

    return new AuthResponseDto({
      ...userAsEntity,
      accessToken,
      listFeature,
      userId: userAsEntity.id,
      storeId: storeEmployee.id,
      storeName: storeEmployee.name,
    });
  }

  async checkTokenLogin(tokenLoginDto: TokenLoginDto): Promise<string> {
    const { username, token } = tokenLoginDto;
    const userAsEntity = await this.userService.findOneBy({ username, token });
    if (!userAsEntity) {
      throw new BadRequestException();
    }
    return userAsEntity.token;
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { password, token } = resetPasswordDto;
    const userAsEntity = await this.userService.findOneBy({ token });
    if (!userAsEntity) {
      throw new BadRequestException(
        ErrorCode.AUTH_PASSWORD_CHANGE_LINK_INVALID_OR_CHANGE_METHOD_BEING_USED,
      );
    }

    const matchOldPassword = HashHelper.bcryptCompareHash(
      password,
      userAsEntity.passwordHash,
    );
    if (matchOldPassword) {
      throw new BadRequestException(ErrorCode.AUTH_MATCH_OLD_PASSWORD);
    }
    const newPasswordHash = HashHelper.bcryptGenerateHash(password);
    const currentTime = DateHelper.currentTimeAsString();
    const userId = userAsEntity.id;

    await this.userService.updateUser(userId, {
      passwordHash: newPasswordHash,
      updatedAt: currentTime,
      passwordModifyDate: currentTime,
      token: null,
      actionMode: 0,
    });
    await this.userTokenService.autoDeleteUserTokenByUserId(
      userId,
      userId,
      USER_TOKEN_DELETED_BY_ACTION.RESET_PASSWORD,
    );
    return {
      username: userAsEntity.username,
    };
  }

  async changePassword(
    changePasswordDto: ChangePasswordDto,
    username: string,
    updatedBy: number,
  ) {
    const { password, newPassword } = changePasswordDto;
    if (password === newPassword) {
      throw new BadRequestException(ErrorCode.AUTH_MATCH_OLD_PASSWORD);
    }
    const loginResponseDto = await this.checkLogin(username, password);
    const { id: userId } = loginResponseDto;
    const newPasswordHash = HashHelper.bcryptGenerateHash(newPassword);
    await this.userService.updateUser(userId, {
      passwordHash: newPasswordHash,
      passwordModifyDate: DateHelper.currentTimeAsString(),
    });
    await this.userTokenService.autoDeleteUserTokenByUserId(
      userId,
      updatedBy,
      USER_TOKEN_DELETED_BY_ACTION.CHANGE_PASSWORD,
    );
  }
  async sendResetPassword(sendResetPasswordDto: SendResetPasswordDto) {
    const { email } = sendResetPasswordDto;
    const employeeFromDb = await this.employeeService.findOneBy({
      email,
    });
    if (!employeeFromDb) {
      throw new BadRequestException(ErrorCode.EMPLOYEE_NOT_FOUND);
    }
    const userFromDb = await this.userService.findOneBy({
      employeeId: employeeFromDb.id,
    });
    const { id: userId, username } = userFromDb;
    const token = uuidv4();
    await this.userService.updateUser(userId, {
      passwordModifyDate: DateHelper.currentTimeAsString(),
      token,
    });
    const environment = await this.appEnvironmentService.getAllEnviroment();
    const link = `${environment['app.url']}/#/login?type=change-password&username=${username}&token=${token}`;
    this.userService.sendMailUser(
      {
        username: userFromDb.username,
        link: link,
      },
      employeeFromDb.email,
      'reset-password',
    );
  }
  async checkLogin(
    username: string,
    password: string,
  ): Promise<CheckLoginReponseDto> {
    const userInfo = await this.userService.findOneBy({
      username,
    });
    if (!userInfo) {
      throw new NotFoundException(ErrorCode.USER_NOT_EXIST);
    }
    if (userInfo.isActive !== IS_ACTIVE_COMMON.TRUE) {
      throw new BadRequestException(ErrorCode.AUTH_USER_IN_ACTIVED);
    }
    const isValidPassword = HashHelper.bcryptCompareHash(
      password,
      userInfo.passwordHash,
    );
    if (!isValidPassword) {
      throw new BadRequestException(
        ErrorCode.USER_USER_NAME_OR_PASSWORD_IN_VALID,
      );
    }

    return new CheckLoginReponseDto({
      id: userInfo.id,
      username: userInfo.username,
      isActive: userInfo.isActive,
      employeeId: userInfo.employeeId,
    });
  }

  async createAccessToken(jwtPayload: JwtPayloadDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      expiresIn: this.apiConfigService.jwt.token_expiration_time,
      accessToken: await this.jwtService.signAsync({
        data: jwtPayload,
      }),
    });
  }

  async validationUserAccess(
    userAsEntity: UserLoginResponseDto,
    clientIp: string,
  ) {
    const { jobTitleId, employeeId, storeId } = userAsEntity;
    const userCanAccess = await this.userAccessService.checkAccessByUserInfor(
      jobTitleId,
      employeeId,
      storeId,
    );
    if (!userCanAccess) {
      throw new BadRequestException(ErrorCode.IP_CAN_NOT_ACCESS, clientIp);
    }
    return userCanAccess;
  }

  async handleValidationLogin({
    userAsEntity,
    authLoginDto,
    environment,
  }: {
    userAsEntity: UserLoginResponseDto;
    authLoginDto: AuthLoginDto;
    environment: any;
  }) {
    const type = this.getValidateType(userAsEntity, authLoginDto, environment);

    switch (type) {
      case AUTH_LOGIN_TYPE.WRONG_PASSWORD:
        await this.updateFailedLogin(userAsEntity);
        throw new NotFoundException(ErrorCode.AUTH_WRONG_PASSWORD);
      case AUTH_LOGIN_TYPE.FIRST_TIME_LOGIN:
      case AUTH_LOGIN_TYPE.CYCLE_TIME_LOGIN:
        return {
          username: userAsEntity.username,
          isNextPassword: true,
          mode: type,
          message: AUTH_LOGIN_TYPE_NAME[type],
        };
    }
  }
  updateLastTimeLogin(
    userId: number,
    actionMode: AUTH_LOGIN_ACTION,
  ): Promise<UpdateResult> {
    const updateUserModel = {
      actionMode,
      lastLoginDate: DateHelper.currentTimeAsString(),
    };
    return this.userService.updateUser(userId, updateUserModel);
  }
  getValidateType(
    userEntity: UserLoginResponseDto,
    authLoginDto: AuthLoginDto,
    environment,
  ): AUTH_LOGIN_TYPE {
    if (!userEntity) {
      throw new BadRequestException(ErrorCode.USER_NOT_EXIST);
    }
    const matchPassword = HashHelper.bcryptCompareHash(
      authLoginDto.password,
      userEntity.passwordHash,
    );
    if (!matchPassword) {
      return AUTH_LOGIN_TYPE.WRONG_PASSWORD;
    }

    if (!userEntity.isActive) {
      throw new BadRequestException(ErrorCode.AUTH_USER_IN_ACTIVED);
    }

    if (!userEntity.employee) {
      throw new BadRequestException(ErrorCode.AUTH_EMPLOYEE_NOT_FOUND);
    }

    if (!userEntity.employee.isActive) {
      throw new BadRequestException(ErrorCode.AUTH_EMPLOYEE_IN_ACTIVED);
    }

    if (userEntity.employee.deleted) {
      throw new BadRequestException(ErrorCode.AUTH_EMPLOYEE_DELETED);
    }

    if (
      !userEntity.employee.listStoreId ||
      !userEntity.employee.listStoreId.trim().length
    ) {
      throw new BadRequestException(ErrorCode.AUTH_EMPLOYEE_EMPTY_STORE);
    }

    if (!userEntity.userRoles[0]) {
      throw new BadRequestException(ErrorCode.AUTH_ROLE_NOT_FOUND);
    }
    if (!userEntity.userRoles[0].id) {
      throw new BadRequestException(ErrorCode.AUTH_ROLE_NOT_FOUND);
    }

    if (
      [
        AUTH_LOGIN_ACTION.FIRST_TIME_LOGN,
        AUTH_LOGIN_ACTION.LOGIN_CHANGE_PASSWORD,
      ].includes(userEntity.actionMode)
    ) {
      return AUTH_LOGIN_TYPE.FIRST_TIME_LOGIN;
    }

    const lastTimeChangePassword = moment(userEntity.passwordModifyDate).add(
      String(get(environment, 'auth.passwordCycle')),
      'month',
    );
    const currentDate = moment();

    if (lastTimeChangePassword.isBefore(currentDate)) {
      return AUTH_LOGIN_TYPE.CYCLE_TIME_LOGIN;
    }

    return AUTH_LOGIN_TYPE.SUCCESS_LOGIN;
  }

  updateFailedLogin(userAsEntity: UserLoginResponseDto): Promise<UpdateResult> {
    const failedLoginCount = userAsEntity.failedLoginCount
      ? userAsEntity.failedLoginCount + 1
      : 1;
    return this.userService.updateUser(userAsEntity.id, { failedLoginCount });
  }

  async updateDefaultStoreMobileEmployee(
    employee: Employee,
    defaultStoreId: number,
  ): Promise<number> {
    await this.employeeService.updateEmployee(employee.id, {
      storeId: defaultStoreId,
    });
    return defaultStoreId;
  }
}
