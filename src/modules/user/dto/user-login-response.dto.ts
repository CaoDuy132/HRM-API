import { Employee } from 'src/modules/employee/entities/employee.entity';
import { UserRoleResponseDto } from './user-role-response.dto';
import { IS_ACTIVE_COMMON } from 'src/common/enum';

export class UserLoginResponseDto {
  id: number;
  username: string;
  employeeId: number;
  isActive: IS_ACTIVE_COMMON;
  lastLoginDate: Date | string;
  failedLoginCount: number;
  actionMode: number;
  employee: Employee;
  userRoles?: UserRoleResponseDto[];
  storeId: number;
  listFeature?: string[];
  storeName?: string;
  jobTitleId: number;
  passwordHash: string;
  passwordModifyDate: string | Date;
  token: string;
  constructor(data: UserLoginResponseDto) {
    this.id = data.id;
    this.username = data.username;
    this.employeeId = data.employeeId;
    this.isActive = data.isActive;
    this.lastLoginDate = data.lastLoginDate;
    this.failedLoginCount = data.failedLoginCount;
    this.actionMode = data.actionMode;
    this.employee = data.employee;
    this.userRoles = data.userRoles;
    this.storeId = data.storeId;
    this.listFeature = data.listFeature;
    this.storeName = data.storeName;
    this.jobTitleId = data.jobTitleId;
    this.passwordHash = data.passwordHash;
    this.passwordModifyDate = data.passwordModifyDate;
    this.token = data.token;
  }
}
