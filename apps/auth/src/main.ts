import { CatchAllFilter } from '@app/common/filters';
import { ResInterceptor } from '@app/common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { UserModule } from './user.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(UserModule);

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

  // trust ingress delegation
  app.set('trust proxy', true);
  app.enableCors({ credentials: true, origin: true });

  await app.listen(3001, () => {
    console.log('User service is listening 3001');
  });
}
bootstrap();
