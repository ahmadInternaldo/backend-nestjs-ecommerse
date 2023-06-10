import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = () => {
      const {
        body,
        url,
        query,
        params,
        headers,
        hostname,
        method,
        originalUrl,
        path,
        httpVersion,
      } = context.switchToHttp().getRequest();
      const response = context.switchToHttp().getResponse();
      return {
        statusCode: response.statusCode ?? response,
        date: new Date().toISOString(),
        body,
        url,
        query,
        params,
        headers,
        hostname,
        method,
        originalUrl,
        path,
        httpVersion,
      };
    };

    return next.handle().pipe(
      tap((response) => {
        Logger.log(
          process.env.NODE_ENV === 'development'
            ? { ...logger(), ...response }
            : JSON.stringify({ ...logger(), ...response }),
        );
      }),
    );
  }
}
