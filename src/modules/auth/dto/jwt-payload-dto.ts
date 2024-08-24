import { IS_ACTIVE_COMMON } from 'src/common/enum';

export class JwtPayloadDto {
  id?: number;
  username: string;
  isActive: IS_ACTIVE_COMMON;
  employeeId: number;
  storeId: number;
  jobTitleId: number;
  _id?: number;
  userId?: number;

  constructor(data: JwtPayloadDto) {
    this._id = data.id;
    this.userId = data.id;
    this.username = data.username;
    this.isActive = data.isActive;
    this.employeeId = data.employeeId;
    this.storeId = data.storeId;
    this.jobTitleId = data.jobTitleId;
  }
}
