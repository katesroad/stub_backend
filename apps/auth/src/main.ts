import { CatchAllFilter } from '@app/common/filters';
import { ResInterceptor } from '@app/common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);

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
    console.log('User service is listening 3001');
  });
}
bootstrap();
