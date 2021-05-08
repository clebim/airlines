import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateFlightService from '../services/CreateFlightService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const createFlightService = container.resolve<CreateFlightService>(
      CreateFlightService,
    );

    const {
      name,
      company_id,
      airport_origin_id,
      airport_destiny_id,
      airplane_model,
      day_week,
      exit_at,
      price,
      capacity,
    } = request.body;

    const responseService = await createFlightService.execute({
      name,
      companyId: company_id,
      airportOriginId: airport_origin_id,
      airportDestinyId: airport_destiny_id,
      airplaneModel: airplane_model,
      dayWeek: day_week,
      exitAt: exit_at,
      price,
      capacity,
    });

    return response.status(200).json(responseService);
  },
};