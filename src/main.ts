import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { raw } from 'express';
import { AppModule } from './app.module';
import { AuthGuard } from './modules/auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true
  });
  app.useGlobalPipes(new ValidationPipe());
  app.use(raw({ limit: "3mb" }))

  await app.listen(3000);
}
bootstrap();
