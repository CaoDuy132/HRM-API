import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Logger } from '../loggers/logger.service';
import { Request } from 'express';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.handleLogRequest(request);

    const startTime = Date.now();
    return next.handle().pipe(
      catchError((error) => this.handleError(error, request)),
      tap(() => this.handleLogResponse(request, startTime)),
    );
  }

  private handleLogRequest(request: Request) {
    const userAgent = request.get('user-agent') || '';
    const body = request.method.toUpperCase();
    const message = `\x1b[32m\x1b[33m${body} ${request.url} - User Agent: ${userAgent}\x1b[0m`;
    this.logger.info({
      message,
      clientIp: request.ip,
    });
  }

  private handleError(error: any, request: Request) {
    const body = JSON.stringify(request.body, null, 2);
    const errorStack = error.stack || error;
    this.logger.error({
      message: `\x1b[31m # error: ${errorStack} \n# body: ${body}\x1b[0m`,
      clientIp: request.ip,
    });
    return throwError(() => error);
  }

  private handleLogResponse(request: Request, startTime: number) {
    const responseTime = Date.now() - startTime;
    const requestMethod = request.method.toUpperCase();
    const requestUrl = request.url;
    this.logger.info({
      message: `\x1b[32m\x1b[33m${requestMethod} ${requestUrl} - [${responseTime}ms] - done\x1b[0m`,
      clientIp: request.ip,
    });
  }
}
