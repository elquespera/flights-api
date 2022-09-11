import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const cors = process.env.NODE_ENV !== 'production';
  const app = await NestFactory.create(AppModule, { cors });

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  const port = process.env.PORT || 4321;
  await app.listen(port);

  console.log(`🚀 Server has started on http://localhost:${port}`);
}
bootstrap();