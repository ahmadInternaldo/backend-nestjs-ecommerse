import { HttpException, HttpStatus } from '@nestjs/common';

export class TransformError {
  constructor(private error: any) {}

  transformError() {
    throw new HttpException(
      this.error.response ?? this.error.message,
      this.error.response?.statusCode ??
        this.error.status ??
        HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
