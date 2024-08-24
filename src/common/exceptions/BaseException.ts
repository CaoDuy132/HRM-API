import { HttpException, HttpStatus } from '@nestjs/common';
import {
  DetailType,
  ErrorCode,
  ErrorCodeType,
  formatErrorMessage,
} from '../error-code';

interface BaseExceptionOptions {
  statusCode: HttpStatus;
  errorCode: ErrorCodeType;
  detail?: DetailType;
  httpStatus: HttpStatus;
}
export class BaseException extends HttpException {
  constructor({
    statusCode,
    errorCode,
    detail,
    httpStatus,
  }: BaseExceptionOptions) {
    const { code, message } = getErrorDetail(errorCode, detail);
    super(
      {
        statusCode,
        message: message || ErrorCode.OTHER.message,
        errorCode: code || ErrorCode.OTHER.code,
      },
      httpStatus,
    );
  }
}

const getErrorDetail = (errorCode: ErrorCodeType, detail?: DetailType) => {
  const { code, message } = errorCode;
  return {
    message: formatErrorMessage(message, detail),
    code,
  };
};
