import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCompanyAirportService from '../services/CreateCompanyAirportService';
import IndexAirportsByCompanyService from '../services/IndexAirportsByCompanyService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const createCompanyAirportService = container.resolve<CreateCompanyAirportService>(
      CreateCompanyAirportService,
    );

    const { company_id, airport_id } = request.body;

    const responseService = await createCompanyAirportService.execute({
      companyId: company_id,
      airportId: airport_id,
    });

    return response.status(200).json(responseService);
  },

  async IndexAirportsByCompany(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const indexAirportsByCompany = container.resolve<IndexAirportsByCompanyService>(
      IndexAirportsByCompanyService,
    );

    const { id } = request.params;

    const responseService = await indexAirportsByCompany.execute(parseInt(id));

    return response.status(200).json(responseService);
  },
};
