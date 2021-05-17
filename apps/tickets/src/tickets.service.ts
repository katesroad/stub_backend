import { BadRequestException, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Ticket, TicketDoc } from './mongo/ticket.schema';
import { CreateTicketDto, UpdateTicketDto } from './dto';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDoc>,
  ) {}

  createTicket(user: string, createTicketDto: CreateTicketDto) {
    const ticketData = { ...createTicketDto, creator: user };
    return this.ticketModel
      .create(ticketData)
      .then((doc) => this.cleanTicket(doc.toJSON()));
  }

  async updateTicket(
    user: string,
    ticketId: string,
    updateTicketDto: UpdateTicketDto,
  ) {
    const record = await this.ticketModel
      .findOne({ _id: ticketId, creator: user })
      .catch((e) => null);

    if (!record) {
      throw new BadRequestException(
        `Either the ticket doesn't exist or current user is not ticket creator`,
      );
    }

    return this.ticketModel
      .findOneAndUpdate({ _id: ticketId, creator: user }, updateTicketDto, {
        returnOriginal: false,
      })
      .then((doc) => (doc ? doc.toJSON() : null))
      .then((doc) => this.cleanTicket(doc));
  }

  async deleteTicket(ticketId: string, user: string) {
    const record = await this.ticketModel
      .findOne({ _id: ticketId, creator: user })
      .catch((e) => null);

    if (!record) {
      throw new BadRequestException(
        `Either the ticket dosen't exist or current user is not ticket creator`,
      );
    }
    return this.ticketModel
      .findOneAndDelete(
        { _id: ticketId, creator: user },
        { returnOriginal: false },
      )
      .then(() => true);
  }

  getTicketById(ticketId: string) {
    return this.ticketModel
      .findOne({ _id: ticketId })
      .then((doc) => (doc ? doc.toJSON() : null))
      .then((doc) => this.cleanTicket(doc));
  }

  getTickets(queryDto: any) {
    return this.ticketModel.find();
  }

  cleanTicket(ticket: any) {
    if (!ticket) return null;
    const { _id, ...ticketData } = ticket;
    return { id: _id, ...ticketData };
  }
}
