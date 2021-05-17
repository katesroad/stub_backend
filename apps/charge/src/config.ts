import { Transport, NatsOptions } from '@nestjs/microservices';

export const NATS_CONF: NatsOptions = {
  transport: Transport.NATS,
  options: {
    url: 'nats://nats-srv:4222',
    queue: 'charge-queue',
  },
};
