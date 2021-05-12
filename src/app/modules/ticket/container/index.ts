import { container } from 'tsyringe';
import ITicketRepository from '../interfaces/ITicketRepository';
import TicketRepository from '../repositories/TicketRepository';

container.registerSingleton<ITicketRepository>(
  'TicketRepository',
  TicketRepository,
);
