import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ticket, TicketSchema } from './ticket.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://tickets-mongo-srv:27017/tickets'),
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
  exports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
  ],
})
export class MongoModule {}
