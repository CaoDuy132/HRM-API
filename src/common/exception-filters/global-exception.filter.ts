import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorCode, ErrorCodeKey } from '../error-code';
import { RESPONSE_STATUS } from '../enum';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message: string | string[] = 'Internal server error';
    let errorCode: ErrorCodeKey = ErrorCode.OTHER.code;
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();
      if (exceptionResponse instanceof Object) {
        message = exceptionResponse.message;
      } else if (exceptionResponse instanceof Array) {
        message = exceptionResponse.map((msg) => {
          const [firstWord, ...rest] = msg.split(' ');
          return firstWord.includes('.') ? rest.join(' ') : msg;
        });
      }
      errorCode = exceptionResponse.errorCode ?? ErrorCode.BAD_REQUEST.code; // Default error code for validation errors if not provided
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      status: RESPONSE_STATUS.ERROR,
      statusCode: status,
      errorCode,
      data: null,
      message: message,
      path: request.url,
    });
  }
}
