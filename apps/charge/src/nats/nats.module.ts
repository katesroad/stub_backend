import { Module } from '@nestjs/common';
import { NATS_CLIENT_PROVIDER } from './nats.provider';
import { NatsService } from './nats.service';

@Module({
  providers: [NatsService, NATS_CLIENT_PROVIDER],
  exports: [NatsService],
})
export class NatsModule {}
