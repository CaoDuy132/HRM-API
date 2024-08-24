export class CheckIpConfigResponseDto {
  ipValid: boolean;
  ip: string;
  constructor(data: CheckIpConfigResponseDto) {
    this.ip = data.ip;
    this.ipValid = data.ipValid || false;
  }
}
