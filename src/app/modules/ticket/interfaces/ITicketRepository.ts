import Ticket from '@modules/typeorm/entities/Ticket';
import ICreateTicket from './ICreateTicket';

export default interface ITicketRepository {
  create(data: ICreateTicket): Promise<Ticket>;
  countTicketsInFlight(date: Date, flightId: number): Promise<number>;
}
