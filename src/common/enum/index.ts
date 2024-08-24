export enum DELETE_TYPE {
  AVAILABLE = 0,
  DELETED = 1,
}

export enum IS_ACTIVE_COMMON {
  TRUE = 1,
  FALSE = 2,
}

export enum STATUS_COMMON {
  ACTIVE = 1, // Hoạt động
  DEACTIVE = 0, // Không hoạt độnga
}

export enum RESPONSE_STATUS {
  SUCCESS = 1,
  ERROR = 0,
}

export enum DEVICE_TYPE {
  WEB_SALE = 1,
  MOBILE_SALE = 2,
}

export enum USER_TOKEN_DELETED_BY_ACTION {
  TOKEN_IS_ACTIVE = 1, //default active when create
  IN_ACTIVE_USER = 2,
  UPDATE_ROLE = 3,
  UPDATE_INFO_USER = 4,
  CHANGE_PASSWORD = 5,
  RESET_PASSWORD = 6,
  RESTORE_PASSWORD = 7,
  TOKEN_EXPIRED = 8,
  RATE_LIMIT = 9,
  REVOKE_TOKEN = 1,
}
