import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code';

export class ConflictException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.CONFLICT,
    detail: DetailType = '',
  ) {
    super({
      statusCode: HttpStatus.CONFLICT,
      errorCode,
      detail,
      httpStatus: HttpStatus.CONFLICT,
    });
  }
}
