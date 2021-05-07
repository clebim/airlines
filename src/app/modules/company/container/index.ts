import { container } from 'tsyringe';
import ICompanyAirportRepository from '../interfaces/ICompanyAirportRepository';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import CompanyAirportRepository from '../repositories/CompanyAirportRepository';
import CompanyRepository from '../repositories/CompanyRepository';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);

container.registerSingleton<ICompanyAirportRepository>(
  'CompanyAirportRepository',
  CompanyAirportRepository,
);
