import { IsNotEmptyCustom, IsStringCustom } from 'src/common/decorators';

export class ChangePasswordDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  password: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  newPassword: string;
}
