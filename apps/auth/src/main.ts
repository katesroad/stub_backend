import { CatchAllFilter } from '@app/common/filters';
import { ResInterceptor } from '@app/common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
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
  app.useGlobalFilters(new CatchAllFilter());
  app.useGlobalInterceptors(new ResInterceptor());
  app.use(cookieParser());
  app.enableCors({ credentials: true, origin: true });

  await app.listen(3001, () => {
    console.log('Auth service is listening 3001');
  });
}
bootstrap();
