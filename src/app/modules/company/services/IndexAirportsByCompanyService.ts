// import Airport from '@modules/typeorm/entities/Airport';
import Airport from '@modules/typeorm/entities/Airport';
import AppError from 'errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICompanyAirportRepository from '../interfaces/ICompanyAirportRepository';
import ICompanyRepository from '../interfaces/ICompanyRepository';

interface ServiceResponse {
  success: boolean;
  message: string;
  airports: Airport[];
}

@injectable()
export default class IndexAirportsByCompanyService {
  constructor(
    @inject('CompanyAirportRepository')
    private companyAirportRepository: ICompanyAirportRepository,
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(companyId: number): Promise<ServiceResponse> {
    const company = await this.companyRepository.findOneById(companyId);

    if (!company) {
      throw new AppError('Compania aérea não existe', 400);
    }

    const response = await this.companyAirportRepository.findAirportsByCompany(
      companyId,
    );

    const airports: Airport[] = [];

    response.map(data => airports.push(data.airport));

    return {
      success: true,
      message: `Aeroportos encontrados com sucesso da empresa ${company.fantasy_name}`,
      airports,
    };
  }
}
