import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsPositive()
  price: number;

  @IsString()
  description: string;

  @IsString()
  title: string;

  @IsString()
  category: string;
}
