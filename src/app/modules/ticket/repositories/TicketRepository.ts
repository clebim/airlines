import connection from '@config/ConnectionDatabaseConfig';
import Ticket from '@modules/typeorm/entities/Ticket';
import { getConnection, Repository } from 'typeorm';
import ICreateTicket from '../interfaces/ICreateTicket';
import ITicketRepository from '../interfaces/ITicketRepository';

export default class TicketRepository implements ITicketRepository {
  private ormRepository: Repository<Ticket>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(Ticket);
  }

  public async countTicketsInFlight(
    date: Date,
    flightId: number,
  ): Promise<number> {
    const countTickets = await this.ormRepository.count({
      where: {
        flight_date: date,
        flight_id: flightId,
      },
    });

    return countTickets;
  }

  public async create(data: ICreateTicket): Promise<Ticket> {
    const newTicket = this.ormRepository.create({
      passenger_name: data.passengerName,
      flight_date: data.flightDate,
      flight_id: data.flightId,
      birth_date: data.birthDate,
      ticket_id: data.ticketId,
    });

    await this.ormRepository.save(newTicket);

    return newTicket;
  }
}
