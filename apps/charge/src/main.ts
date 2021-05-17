import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core';
import { CatchAllFilter } from '@app/common/filters';
import { ResInterceptor } from '@app/common/interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { ChargeModule } from './charge.module';
import { NATS_CONF } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(ChargeModule);

  // For doc, please refer interface NatsOptions
  app.connectMicroservice<MicroserviceOptions>(NATS_CONF);

  await app.startAllMicroservicesAsync();

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

  await app.listen(3002, () => {
    console.log('Charge service is listening 3002');
  });
}
bootstrap();
