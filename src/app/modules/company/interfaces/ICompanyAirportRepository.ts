import CompanyAirport from '@modules/typeorm/entities/CompanyAirport';

export interface ICreateCompanyAirport {
  companyId: number;
  airportId: number;
}

export default interface ICompanyAirportRepository {
  create(data: ICreateCompanyAirport): Promise<CompanyAirport>;
  findAirportsByCompany(companyId: number): Promise<CompanyAirport[]>;
}
