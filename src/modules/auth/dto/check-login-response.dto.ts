import { IS_ACTIVE_COMMON } from 'src/common/enum';

export class CheckLoginReponseDto {
  id?: number;
  username?: string;
  isActive: IS_ACTIVE_COMMON;
  employeeId?: number;
  constructor(data: CheckLoginReponseDto) {
    this.id = data.id;
    this.username = data.username;
    this.isActive = data.isActive;
    this.employeeId = data.employeeId;
  }
}
