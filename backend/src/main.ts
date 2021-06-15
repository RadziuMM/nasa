import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(process.env.PORT);
  console.clear();
  console.log(`app is running on port ${port}`);
}
bootstrap();
