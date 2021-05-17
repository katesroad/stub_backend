import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as Mongoose from 'mongoose';

export type TicketDoc = Ticket & Mongoose.Document;

class EventTime {
  startAt: number;
  endAt: number;
}

@Schema({ versionKey: false })
export class Ticket {
  @Prop({
    required: true,
    type: Mongoose.Schema.Types.ObjectId,
  })
  creator: string; // MongoDB ObjectId

  @Prop([Mongoose.Schema.Types.String])
  imgs?: string[];

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    message: 'ticket title is required',
  })
  title: string;

  @Prop({
    required: true,
    mesasge: 'description is required',
  })
  description: string;

  @Prop({
    required: true,
    message: 'category is required',
  })
  category: string;

  @Prop({ default: true })
  available?: boolean;

  @Prop({ required: true })
  time: EventTime;

  @Prop()
  location: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
