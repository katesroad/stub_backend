import { AuthModule } from '@app/common/auth';
import { Module } from '@nestjs/common';
import { MongoModule } from './mongo/mongo.module';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';

@Module({
  imports: [MongoModule, AuthModule],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
