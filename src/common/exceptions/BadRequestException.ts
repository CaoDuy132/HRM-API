import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code/';
export class BadRequestException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.BAD_REQUEST,
    detail?: DetailType,
  ) {
    super({
      statusCode: HttpStatus.BAD_REQUEST,
      errorCode,
      detail,
      httpStatus: HttpStatus.BAD_REQUEST,
    });
  }
}
