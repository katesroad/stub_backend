import { Module } from '@nestjs/common';
import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';
import { NatsModule } from './nats/nats.module';

@Module({
  imports: [NatsModule],
  controllers: [ChargeController],
  providers: [ChargeService],
})
export class ChargeModule {}
