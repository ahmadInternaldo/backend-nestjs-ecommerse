import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Interceptor } from './utils/interceptor';
import { HttpExceptionFilter } from './utils/filter-exception';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //  set global intercept
  app.useGlobalInterceptors(new Interceptor());
  // set global exception
  app.useGlobalFilters(new HttpExceptionFilter());
  // set validator
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Ecommerse API')
      .setVersion('1.0')
      .addTag('NESTJS ECOMMERSE')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
  await app.listen(process.env.NODE_PORT);
}
bootstrap();
