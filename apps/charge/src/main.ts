import { NestFactory } from '@nestjs/core';
import { ChargeModule } from './charge.module';

async function bootstrap() {
  const app = await NestFactory.create(ChargeModule);
  await app.listen(3002, () => {
    console.log('Charge service is listening 3002');
  });
}
bootstrap();
