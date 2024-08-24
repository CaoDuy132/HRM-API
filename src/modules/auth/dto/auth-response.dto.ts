import { IS_ACTIVE_COMMON } from 'src/common/enum';

export class AuthResponseDto {
  userId: number;
  username: string;
  storeId: number;
  storeName: string;
  employeeId: number;
  isActive: IS_ACTIVE_COMMON;
  accessToken: string;
  listFeature: string[];
  jobTitleId: number;
  employee: any;
  constructor(data: AuthResponseDto) {
    this.userId = data.userId;
    this.username = data.username;
    this.storeId = data.storeId;
    this.storeName = data.storeName;
    this.employeeId = data.employeeId;
    this.isActive = data.isActive;
    this.accessToken = data.accessToken;
    this.listFeature = data.listFeature;
    this.jobTitleId = data.jobTitleId;
    this.employee = data.employee;
  }
}
