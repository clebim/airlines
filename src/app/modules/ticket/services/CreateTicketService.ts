import IFlightRepository from '@modules/modules/flight/interfaces/IFlightRepository';
import AppError from 'errors/AppError';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';
import { isFuture, isValid, parseISO } from 'date-fns';
import Ticket from '@modules/typeorm/entities/Ticket';
import ICreateTicket from '../interfaces/ICreateTicket';
import ITicketRepository from '../interfaces/ITicketRepository';
import { ticketSchemaValidator } from '../validators/CreateTicketValidator';

interface ServiceResponse {
  success: boolean;
  message: string;
  ticket: Ticket;
}

@injectable()
export default class CreateTicketService {
  constructor(
    @inject('TicketRepository')
    private ticketRepository: ITicketRepository,
    @inject('FlightRepository')
    private flightRepository: IFlightRepository,
  ) {}

  public async execute(
    data: Omit<ICreateTicket, 'ticketId'>,
  ): Promise<ServiceResponse> {
    if (
      !ticketSchemaValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await ticketSchemaValidator
        .validate(data, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      throw new AppError(errorMessage, 422);
    }

    const parsedFlightDate = parseISO(data.flightDate);
    const parsedBirthDate = parseISO(data.birthDate);

    if (!isValid(parsedFlightDate) || !isValid(parsedBirthDate)) {
      throw new AppError('Data informada inválida', 422);
    }

    if (!isFuture(parsedFlightDate)) {
      throw new AppError('Data do voo não pode ser no passado', 400);
    }

    // pesquisar se o aviao ja esta lotado;

    const flight = await this.flightRepository.findById(data.flightId);

    if (!flight) {
      throw new AppError('Voo informado não existe', 400);
    }

    const countTickets = await this.ticketRepository.countTicketsInFlight(
      data.flightDate,
      data.flightId,
    );

    if (countTickets >= flight.capacity) {
      throw new AppError('Capacidade máximo do avião ja foi atingida', 400);
    }

    const newTicket = await this.ticketRepository.create({
      passengerName: data.passengerName,
      flightId: data.flightId,
      flightDate: data.flightDate,
      birthDate: data.birthDate,
      ticketId: uuidV4(),
    });

    return {
      success: true,
      message: 'Compra de ticket efetuada com sucesso',
      ticket: newTicket,
    };
  }
}
