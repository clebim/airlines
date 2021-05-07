import CompanyAirport from '@modules/typeorm/entities/CompanyAirport';
import { inject, injectable } from 'tsyringe';
import ICompanyAirportRepository, {
  ICreateCompanyAirport,
} from '../interfaces/ICompanyAirportRepository';

@injectable()
export default class CreateCompanyAirportService {
  constructor(
    @inject('CompanyAirportRepository')
    private companyAirportRepository: ICompanyAirportRepository,
  ) {}

  public async execute(data: ICreateCompanyAirport): Promise<CompanyAirport> {
    const newCompanyAirport = await this.companyAirportRepository.create({
      companyId: data.companyId,
      airportId: data.airportId,
    });

    return newCompanyAirport;
  }
}
