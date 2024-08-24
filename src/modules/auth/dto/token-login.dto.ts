import { IsNotEmptyCustom, IsStringCustom } from 'src/common/decorators';

export class TokenLoginDto {
  @IsNotEmptyCustom()
  username: string;

  @IsNotEmptyCustom()
  @IsStringCustom()
  token: string;
}
