import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code/';
export class UnauthorizedException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.UNAUTHORIZED,
    detail?: DetailType,
  ) {
    super({
      statusCode: HttpStatus.UNAUTHORIZED,
      errorCode,
      detail,
      httpStatus: HttpStatus.UNAUTHORIZED,
    });
  }
}
