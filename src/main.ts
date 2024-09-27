import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigModule,ConfigService } from '@nestjs/config';
import { SimpleLoggerMiddleware,simpleFunc } from './middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: { origin: process.env.CLIENT_ORIGIN },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(app.get(ConfigService).get("PORT"));
}
bootstrap();