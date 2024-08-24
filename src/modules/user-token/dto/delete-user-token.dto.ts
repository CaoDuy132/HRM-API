import { DELETE_TYPE, USER_TOKEN_DELETED_BY_ACTION } from 'src/common/enum';

export class DeleteUserTokenDto {
  deleted?: DELETE_TYPE;
  updatedBy: number;
  deletedByAction: USER_TOKEN_DELETED_BY_ACTION;
  constructor(data: DeleteUserTokenDto) {
    this.deleted = DELETE_TYPE.DELETED;
    this.updatedBy = data.updatedBy;
    this.deletedByAction = data.deletedByAction;
  }
}
