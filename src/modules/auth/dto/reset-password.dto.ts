import { IsNotEmptyCustom } from 'src/common/decorators';

export class ResetPasswordDto {
  @IsNotEmptyCustom()
  username: string;

  @IsNotEmptyCustom()
  password: string;

  @IsNotEmptyCustom()
  token: string;
}
