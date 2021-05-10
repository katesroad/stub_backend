import { NestFactory } from '@nestjs/core';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.create(OrdersModule);
  await app.listen(3003, () => {
    console.log('Order service is listening 3003');
  });
}
bootstrap();
