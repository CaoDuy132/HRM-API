import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code/';
export class NotFoundException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.NOT_FOUND,
    detail?: DetailType,
  ) {
    super({
      statusCode: HttpStatus.NOT_FOUND,
      errorCode,
      detail,
      httpStatus: HttpStatus.NOT_FOUND,
    });
  }
}
