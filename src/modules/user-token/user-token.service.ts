import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from './entities/user-token.entity';
import { InsertResult, Repository } from 'typeorm';
import {
  CreateUserTokenDto,
  DeleteUserTokenDto,
  ValidUserTokenResponseDto,
} from './dto';
import { validate } from 'class-validator';
import { ErrorCode } from 'src/common/error-code';
import {
  BadRequestException,
  ForbiddenException,
  UnprocessableEntityException,
} from 'src/common/exceptions';
import { DELETE_TYPE, USER_TOKEN_DELETED_BY_ACTION } from 'src/common/enum';
import { HashHelper } from 'src/common/helpers/hash.helper';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectRepository(UserToken)
    private readonly userTokenRepo: Repository<UserToken>,
  ) {}
  async createUserToken(
    createUserTokenModel: CreateUserTokenDto,
  ): Promise<InsertResult> {
    const createUserTokenDto = new CreateUserTokenDto(createUserTokenModel);
    const errors = await validate(createUserTokenDto);
    if (errors.length) {
      const errorMessage = errors.map(
        (error) => error.constraints[Object.keys(error.constraints)[0]],
      );
      throw new UnprocessableEntityException(
        ErrorCode.UNPROCESSABLE_ENTITY,
        errorMessage,
      );
    }
    return this.userTokenRepo.insert(createUserTokenDto);
  }
  async autoDeleteUserTokenByUserId(
    userId: number,
    updatedBy: number,
    deletedByAction: USER_TOKEN_DELETED_BY_ACTION,
  ) {
    if (!userId) {
      throw new BadRequestException();
    }
    const userTokens = await this.findAllUserTokenBy({ userId });
    await Promise.all(
      userTokens.map(async (userToken) => {
        const deleteUserTokenDto = new DeleteUserTokenDto({
          updatedBy: updatedBy || userId,
          deletedByAction,
        });
        await this.updateUserToken(userToken.id, deleteUserTokenDto);
      }),
    );
    //handleRemoveCacheUserTokenByUserId
    //#TODO remove redis cache
  }
  async findAllUserTokenBy(
    whereCondition = {},
    selectAttributes = [],
  ): Promise<UserToken[]> {
    const defaultAttributes = ['id', 'token', 'userId', 'permissions'];
    return await this.userTokenRepo.find({
      where: {
        ...whereCondition,
        deleted: Boolean(DELETE_TYPE.AVAILABLE),
      },
      select: selectAttributes.length ? selectAttributes : defaultAttributes,
    });
  }
  async findOneUserTokenBy(
    whereCondition = {},
    selectAttributes = [],
  ): Promise<UserToken> {
    const defaultAttributes = ['id', 'token', 'userId', 'permissions'];
    return await this.userTokenRepo.findOne({
      where: {
        ...whereCondition,
        deleted: Boolean(DELETE_TYPE.AVAILABLE),
      },
      select: selectAttributes.length ? selectAttributes : defaultAttributes,
    });
  }
  validUserToken = async (
    userId: number,
    tokenFromClient: string,
  ): Promise<ValidUserTokenResponseDto> => {
    if (!userId || !tokenFromClient) {
      throw new ForbiddenException();
    }
    const hashedToken = HashHelper.generateSHA256Hash(tokenFromClient);
    // #TODO
    // const redisKey = `${REDIS_KEY.USER_TOKEN}:${userId}:${hashedToken}`;
    // const dataFromCache = await getDataRedis(redisKey);
    // if (dataFromCache) {
    //   return JSON.parse(dataFromCache);
    // }
    const foundUserToken = await this.findOneUserTokenBy({
      token: hashedToken,
    });
    if (!foundUserToken) {
      throw new ForbiddenException();
    }
    const response = new ValidUserTokenResponseDto(foundUserToken);
    // #TO-DO await setDataRedisWithTTL(redisKey, response, REDIS_TIME.ONE_DATE, true);
    return response;
  };
  /**
   * Updates a user token record in the database.
   *
   * @param {number} id - The ID of the user token to update.
   * @param {Object} userTokenModel - The data to update the user token with.
   * @returns {Promise} A promise that resolves when the update is complete.
   */
  updateUserToken(id, userTokenModel) {
    return this.userTokenRepo.update(id, userTokenModel);
  }
  findAll() {
    return `This action returns all userToken`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userToken`;
  }

  remove(id: number) {
    return `This action removes a #${id} userToken`;
  }
}
