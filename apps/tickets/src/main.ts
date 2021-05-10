import { NestFactory } from '@nestjs/core';
import { TicketsModule } from './tickets.module';

async function bootstrap() {
  const app = await NestFactory.create(TicketsModule);
  await app.listen(3004, () => {
    console.log('Ticket service is listening 3004');
  });
}
bootstrap();
