import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code/';
export class ForbiddenException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.FORBIDDEN,
    detail?: DetailType,
  ) {
    super({
      statusCode: HttpStatus.FORBIDDEN,
      errorCode,
      detail,
      httpStatus: HttpStatus.FORBIDDEN,
    });
  }
}
