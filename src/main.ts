import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT: number = 8000;
  app.enableCors({
    origin: ['http://localhost:3000', 'https://qr-movie-frontend.vercel.app'],
    credentials: true,
  });

  await app.listen(PORT || 3000);
}
bootstrap();
