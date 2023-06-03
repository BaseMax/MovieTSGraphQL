import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useBodyParser("raw")

  await app.listen(3000);
}
bootstrap();
