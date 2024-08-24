import { IsNumber, IsString } from 'class-validator';

export class TokenPayloadDto {
  @IsNumber()
  expiresIn: number | string;

  @IsString()
  accessToken: string;

  constructor(data: { expiresIn: number | string; accessToken: string }) {
    this.expiresIn = data.expiresIn;
    this.accessToken = data.accessToken;
  }
}
