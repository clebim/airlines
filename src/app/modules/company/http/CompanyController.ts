import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ICreateCompany from '../interfaces/ICreateCompany';
import CreateCompanyService from '../services/CreateCompanyService';

export default {
  async create(request: Request, response: Response): Promise<Response> {
    const createCompanyService = container.resolve<CreateCompanyService>(
      CreateCompanyService,
    );

    const responseService = await createCompanyService.execute(
      request.body as ICreateCompany,
    );

    return response.status(200).json(responseService);
  },
};
