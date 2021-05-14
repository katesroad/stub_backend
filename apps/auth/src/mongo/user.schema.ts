import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDoc = User & Document;

@Schema({ versionKey: false })
export class User {
  @Prop()
  username?: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  token?: string; //refresh token
}

export const UserSchema = SchemaFactory.createForClass(User);
