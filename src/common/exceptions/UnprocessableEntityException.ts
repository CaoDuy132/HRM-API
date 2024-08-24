import { HttpStatus } from '@nestjs/common';
import { BaseException } from './BaseException';
import { DetailType, ErrorCode, ErrorCodeType } from '../error-code/';
export class UnprocessableEntityException extends BaseException {
  constructor(
    errorCode: ErrorCodeType = ErrorCode.UNPROCESSABLE_ENTITY,
    detail?: DetailType,
  ) {
    super({
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      errorCode,
      detail,
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    });
  }
}
