export const ErrorCode = {
  // HTTP
  OTHER: {
    code: 'OTHER',
    message: 'Lỗi không xác định',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    message: 'Bạn không có quyền thực hiện thao tác này!',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Không tìm thấy!',
  },
  BAD_REQUEST: {
    code: 'BAD_REQUEST',
    message: 'Yêu cầu không hợp lệ!',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Tài khoản chưa được xác thực!',
  },
  CONFLICT: {
    code: 'CONFLICT',
    message: 'Tài nguyên đã tồn tại!',
  },

  // EMPLOYEE
  EMPLOYEE_NOT_FOUND: {
    code: 'EMPLOYEE_NOT_FOUND',
    message: 'Nhân sự không tồn tại',
  },

  // USER
  USER_NOT_EXIST: {
    code: 'USER_NOT_EXIST',
    message: 'Tài khoản không tồn tại',
  },
  USER_USER_NAME_OR_PASSWORD_IN_VALID: {
    code: 'USER_USER_NAME_OR_PASSWORD_IN_VALID',
    message: 'Tài khoản hoặc mật khẩu không hợp lệ',
  },
  USER_IN_ACTIVE: {
    code: 'USER_IN_ACTIVE',
    message: 'Kiểm lại tài khoản hoặc liên hệ IT',
  },
  USER_NOT_PASSWORD_HASH: {
    code: 'USER_NOT_PASSWORD_HASH',
    message: 'Mật khẩu chưa được cấp vui lòng liên hệ IT',
  },

  //VALIDATION
  UNPROCESSABLE_ENTITY: {
    code: 'UNPROCESSABLE_ENTITY',
    message: '{detail}',
  },

  //IP
  IP_CAN_NOT_ACCESS: {
    code: '',
    message: 'Địa chỉ {detail} không có quyền truy cập!',
  },

  //
  AUTH_WRONG_PASSWORD: {
    code: 'AUTH_WRONG_PASSWORD',
    message: 'Mật khẩu không chính xác',
  },
  AUTH_USER_IN_ACTIVED: {
    code: 'AUTH_USER_IN_ACTIVED',
    message: 'Nhân viên đã bị khoá',
  },
  AUTH_EMPLOYEE_NOT_FOUND: {
    code: 'AUTH_EMPLOYEE_NOT_FOUND',
    message: 'Nhân viên chưa được gán tài khoản',
  },
  AUTH_EMPLOYEE_IN_ACTIVED: {
    code: 'AUTH_EMPLOYEE_IN_ACTIVED',
    message: 'Nhân viên đã bị khoá',
  },
  AUTH_EMPLOYEE_DELETED: {
    code: 'AUTH_EMPLOYEE_DELETED',
    message: 'Nhân viên không tồn tại',
  },
  AUTH_EMPLOYEE_EMPTY_STORE: {
    code: 'AUTH_EMPLOYEE_EMPTY_STORE',
    message: 'Không có danh sách cửa hàng nào được gán',
  },
  AUTH_ROLE_NOT_FOUND: {
    code: 'AUTH_ROLE_NOT_FOUND',
    message: 'Tài khoản chưa được gán quyền',
  },
  AUTH_PASSWORD_CHANGE_LINK_EXPIRED_OR_INVALID: {
    code: 'AUTH_PASSWORD_CHANGE_LINK_EXPIRED_OR_INVALID',
    message: 'Đường dẫn đổi mật khẩu đã hết hạn hoặc không hợp lệ',
  },
  AUTH_PASSWORD_CHANGE_LINK_INVALID_OR_CHANGE_METHOD_BEING_USED: {
    code: 'AUTH_PASSWORD_CHANGE_LINK_EXPIRED_OR_INVALID',
    message: 'Đường dẫn đổi mật khẩu đã hết hạn hoặc không hợp lệ',
  },
  AUTH_MATCH_OLD_PASSWORD: {
    code: 'AUTH_MATCH_OLD_PASSWORD',
    message: 'Mật khẩu mới không được trùng với mật khẩu cũ',
  },
  AUTH_RESET_PASSWORD_WITH_TOKEN_INVALID: {
    code: 'AUTH_RESET_PASSWORD_WITH_TOKEN_INVALID',
    message: 'Token để reset mật khẩu không hợp lệ!',
  },
  AUTH_MAIL_MISSING_TEMPLATE: {
    code: 'AUTH_MAIL_REQUIRED_TEMPLATE',
    message: 'Yêu cầu template!',
  },
  AUTH_MAIL_MISSING_USER_MAIL: {
    code: 'AUTH_MAIL_MISSING_USER_MAIL',
    message: 'Vui lòng thêm mail người dùng!',
  },
  AUTH_MAIL_MISSING_RECIEVER_MAIL: {
    code: 'AUTH_MAIL_MISSING_USER_MAIL',
    message: 'Vui lòng thêm mail người dùng!',
  },
  AUTH_ACCESS_TOKEN_IN_VALID: {
    code: 'AUTH_ACCESS_TOKEN_IN_VALID',
    message: 'Access token không hợp lệ!',
  },
} as const;
