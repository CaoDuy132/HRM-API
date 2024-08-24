import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  lastLoginDate?: Date | string;
  @IsOptional()
  actionMode?: number;
  @IsOptional()
  failedLoginCount?: number;
  @Exclude()
  id?: number;
  @IsOptional()
  passwordHash?: string;

  @IsOptional()
  updatedAt?: Date | string;
  @IsOptional()
  passwordModifyDate?: Date | string;
  @IsOptional()
  token?: string;
}
