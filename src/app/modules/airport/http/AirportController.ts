import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAirportService from '../services/CreateAirportService';
import ListAllAirportsService from '../services/ListAllAirportsService';

export default {
  async index(request: Request, response: Response): Promise<Response> {
    const listAllAirportsService = container.resolve<ListAllAirportsService>(
      ListAllAirportsService,
    );

    const airports = await listAllAirportsService.execute();

    return response.status(200).json(airports);
  },

  async create(request: Request, response: Response): Promise<Response> {
    const createAirportService = container.resolve<CreateAirportService>(
      CreateAirportService,
    );

    const { name, nickname, city } = request.body;

    const airport = await createAirportService.execute({
      name,
      nickname,
      city,
    });

    return response.status(200).json(airport);
  },
};
