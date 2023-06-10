import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const statusCode = exception.getStatus();
    const responseMessage: any = exception.getResponse();
    const { message, error } = responseMessage;

    const response = ctx.getResponse<Response>();
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
    } = response.req;
    const logger = {
      statusCode,
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
      message: message ?? responseMessage,
      success: '',
      error: error ?? 'Internal Server Error',
    };
    if (+statusCode >= 500) {
      Logger.error(
        process.env.NODE_ENV === 'development'
          ? logger
          : JSON.stringify(logger),
      );
    } else {
      Logger.warn(
        process.env.NODE_ENV === 'development'
          ? logger
          : JSON.stringify(logger),
      );
    }

    response.status(statusCode).json({
      message: message ?? responseMessage,
      success: '',
      error: error ?? 'Internal Server Error',
    });
  }
}
