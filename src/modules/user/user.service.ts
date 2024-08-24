import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestException, NotFoundException } from 'src/common/exceptions';
import { ErrorCode } from 'src/common/error-code';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DELETE_TYPE, IS_ACTIVE_COMMON } from 'src/common/enum';
import { omit } from 'lodash';
import { UserRole } from './entities/user-role.entity';
import { RoleFeature } from '../role/entities/role-feature.entity';
import { UserLoginResponseDto } from './dto';
import { GoogleCloudService } from '../google-cloud/google-cloud.service';
import { AppEnvironmentService } from '../app-environment/app-environment.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    @InjectRepository(UserRole)
    private readonly userRoleRepo: Repository<UserRole>,
    @InjectRepository(RoleFeature)
    private readonly roleFeatureRepo: Repository<RoleFeature>,
    private readonly googleCloudService: GoogleCloudService,
    private readonly appEnvironmentService: AppEnvironmentService,
  ) {}
  create(createUserDto: CreateUserDto) {
    return `This action adds a new user ${createUserDto}`;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user ${updateUserDto}`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  findOneBy(whereClause = {}, otherOptions = {}) {
    return this.userRepo.findOne({
      where: {
        ...whereClause,
        deleted: Boolean(DELETE_TYPE.AVAILABLE),
      },
      ...otherOptions,
    });
  }
  async getUserByUserNameOrEmail(
    usernameOrEmail: string,
  ): Promise<UserLoginResponseDto> {
    const foundUser = await this.userRepo
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.employee', 'employee')
      .innerJoinAndSelect('user.userRoles', 'userRoles')
      .where('user.username = :usernameOrEmail', { usernameOrEmail })
      .orWhere('employee.email = :usernameOrEmail', { usernameOrEmail })
      .getOne();
    if (!foundUser) {
      throw new NotFoundException(ErrorCode.USER_NOT_EXIST);
    }
    if (foundUser.isActive === IS_ACTIVE_COMMON.FALSE) {
      throw new BadRequestException(ErrorCode.USER_IN_ACTIVE);
    }
    if (!foundUser.passwordHash) {
      throw new BadRequestException(ErrorCode.USER_NOT_PASSWORD_HASH);
    }
    const { storeId, jobTitleId } = foundUser.employee;
    return new UserLoginResponseDto({ ...foundUser, storeId, jobTitleId });
  }
  getAllRoleByUserId(userId: number) {
    this.userRoleRepo.find({
      where: {
        userId,
      },
    });
  }
  async getFeaturesNameByRoleId(roleId: string): Promise<string[]> {
    const roleFeatures = await this.roleFeatureRepo
      .fCreateFilterBuilder('roleFeature')
      .fAndWhere('roleId', roleId)
      .innerJoinAndSelect('roleFeature.feature', 'feature')
      .select(['roleFeature.roleId', 'feature.id', 'feature.name'])
      .getMany();
    const listFeature = roleFeatures.map(({ feature }) => feature.name);
    return listFeature;
  }
  /**
   *
   * @param id
   * @param userModel
   * #TODO
   */
  updateUser(id: number, userModel: UpdateUserDto): Promise<UpdateResult> {
    const updateUserEntity = omit(userModel, 'id');
    return this.userRepo.update(id, updateUserEntity);
  }
  async sendMailUser(params, email: string, template: string, title?: string) {
    const googleMail = this.googleCloudService.setTemplate(template);
    switch (template) {
      case 'welcome-user': {
        const titleSetter = title || 'Thông báo tài khoản mới';
        const environment = await this.appEnvironmentService.getAllEnviroment();

        googleMail
          .setSubject(titleSetter)
          .setTemplateValue({
            username: params.username,
            password: params.password,
            link: environment['app.url'],
          })
          .setUserReceivers([email]);
        break;
      }
      case 'reset-password': {
        const titleSetter = title || 'Thông báo link đổi mật khẩu';
        googleMail
          .setSubject(titleSetter)
          .setTemplate('reset-password')
          .setTemplateValue({
            username: params.username,
            linkReset: params.link,
          })
          .setUserReceivers([email]);
        break;
      }
      default:
        break;
    }
    return googleMail.send();
  }
}
