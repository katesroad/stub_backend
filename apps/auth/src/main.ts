import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { ResInterceptor, CatchAllFilter } from '@app/common';
import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(new ResInterceptor());
  app.useGlobalFilters(new CatchAllFilter());
  app.use(cookieParser());

  await app.listen(3000, () => {
    console.log(`\n
    Auth service started successfully
    \n`);
  });
}

bootstrap();
