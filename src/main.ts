import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // menambahakan prifix global
  app.setGlobalPrefix('/api/v1');
  
  // membuat validasi secara global
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
