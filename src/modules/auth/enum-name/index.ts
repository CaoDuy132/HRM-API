import { AUTH_LOGIN_TYPE } from '../enum';

export const AUTH_LOGIN_TYPE_NAME = {
  [AUTH_LOGIN_TYPE.WRONG_PASSWORD]: 'Mật khẩu không đúng',
  [AUTH_LOGIN_TYPE.FIRST_TIME_LOGIN]: 'Cập nhật mật khẩu đầu tiên đăng nhập',
  [AUTH_LOGIN_TYPE.CYCLE_TIME_LOGIN]: 'Cập nhật mật khẩu định kỳ',
  [AUTH_LOGIN_TYPE.SUCCESS_LOGIN]: 'Đăng nhập thành công',
};
