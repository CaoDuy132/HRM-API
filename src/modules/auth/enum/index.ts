export enum AUTH_LOGIN_ACTION {
  FIRST_TIME_LOGN = 1,
  LOGIN_AGAIN = 2,
  LOGIN_CHANGE_PASSWORD = 3,
}

export enum AUTH_LOGIN_TYPE {
  WRONG_PASSWORD = 'wrong-password',
  FIRST_TIME_LOGIN = 'first-time-login',
  CYCLE_TIME_LOGIN = 'cycle-time-login',
  SUCCESS_LOGIN = 'success-login',
}
