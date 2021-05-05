import { container } from 'tsyringe';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import CompanyRepository from '../repositories/CompanyRepository';

container.registerSingleton<ICompanyRepository>(
  'CompanyRepository',
  CompanyRepository,
);
