import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AllExceptionsFilter } from './filters/http-exception.filter';
import { HttpExceptionFilter } from './filters/bad-request.filter';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const reflector = app.get(Reflector);

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(
    new AllExceptionsFilter(httpAdapterHost),
    new HttpExceptionFilter(reflector),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      transform: true,
      dismissDefaultMessages: true,
      exceptionFactory: (errors) => new UnprocessableEntityException(errors),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Booking')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .addTag('booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(3030);
  console.info(`server running on ${await app.getUrl()}`);
}
void bootstrap();
