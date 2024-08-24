export class ValidUserTokenResponseDto {
  token: string;
  userId: number;
  permissions: string;

  constructor(data: ValidUserTokenResponseDto) {
    this.token = data.token;
    this.userId = data.userId;
    this.permissions = JSON.parse(data.permissions) || [];
  }
}
