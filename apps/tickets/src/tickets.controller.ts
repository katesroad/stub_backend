import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateTicketDto, UpdateTicketDto } from './dto';
import { JwtGuard } from '@app/common/auth/guards/jwt.guard';
import { TicketsService } from './tickets.service';
import { User } from '@app/common';

@Controller()
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @UseGuards(JwtGuard)
  @Post()
  createTicket(
    @Body() createDto: CreateTicketDto,
    @User('id') user: string,
    @Req() req: any,
  ) {
    return this.ticketsService.createTicket(user, createDto);
  }

  @Get()
  getTickets(@Query() queryDto: any) {
    return this.ticketsService.getTickets(queryDto);
  }

  @Get('id')
  getTicketById(@Param('id') id: string) {
    return this.ticketsService.getTicketById(id);
  }

  @UseGuards(JwtGuard)
  @Patch('id')
  updateTicket(
    @User('id') user: string,
    @Param('id') ticketId: string,
    @Body() updateDto: UpdateTicketDto,
  ) {
    return this.ticketsService.updateTicket(user, ticketId, updateDto);
  }
}
