import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateTicketService from '../services/CreateTicketService';

export default {
  async store(request: Request, response: Response): Promise<Response> {
    const createTicketService = container.resolve<CreateTicketService>(
      CreateTicketService,
    );

    const { date, flight_id, passenger_name, birth_date } = request.body;

    const responseService = await createTicketService.execute({
      flightId: flight_id,
      flightDate: date,
      birthDate: birth_date,
      passengerName: passenger_name,
    });

    return response.json(responseService);
  },
};
