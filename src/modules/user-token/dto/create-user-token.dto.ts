import { IsDateString, IsOptional } from 'class-validator';
import {
  IsNotEmptyCustom,
  IsNumberCustom,
  IsStringCustom,
} from 'src/common/decorators';
import { HashHelper } from 'src/common/helpers/hash.helper';

export class CreateUserTokenDto {
  @IsNotEmptyCustom()
  @IsNumberCustom()
  userId: number;

  @IsNotEmptyCustom()
  @IsStringCustom()
  token: string;

  @IsStringCustom()
  permissions: string;

  @IsStringCustom()
  ip: string;

  @IsDateString()
  expiredAt: string | Date;

  @IsOptional()
  @IsDateString()
  revokedAt?: string | Date;

  @IsStringCustom()
  userAgent: string;

  constructor(data: CreateUserTokenDto) {
    this.userId = data.userId;
    this.token = HashHelper.generateSHA256Hash(data.token);
    this.permissions = data.permissions || '[]';
    this.ip = data.ip;
    this.expiredAt = data.expiredAt;
    this.revokedAt = data.revokedAt || null;
    this.userAgent = data.userAgent;
  }
}
