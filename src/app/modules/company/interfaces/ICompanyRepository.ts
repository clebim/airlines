import Company from '@modules/typeorm/entities/Company';
import ICreateCompany from './ICreateCompany';

export default interface ICompanyRepository {
  createCompany(data: ICreateCompany): Promise<Company>;
  findByEmailOrCnpj(
    email?: string,
    cnpj?: string,
  ): Promise<Company | undefined>;
  findOneByEmail(email: string): Promise<Company | undefined>;
  getCompanyWithPassword(email: string): Promise<Company | undefined>;
}
