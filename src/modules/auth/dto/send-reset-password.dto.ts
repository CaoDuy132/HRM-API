import { IsNotEmptyCustom, IsStringCustom } from 'src/common/decorators';

export class SendResetPasswordDto {
  @IsNotEmptyCustom()
  @IsStringCustom()
  email: string;
}
