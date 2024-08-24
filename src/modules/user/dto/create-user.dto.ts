import { Exclude } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  failedLoginCount?: number;
  @Exclude()
  id: number;
}
