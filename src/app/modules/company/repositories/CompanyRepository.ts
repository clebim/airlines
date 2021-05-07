import connection from '@config/ConnectionDatabaseConfig';
import Company from '@modules/typeorm/entities/Company';
import { getConnection, Repository } from 'typeorm';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import ICreateCompany from '../interfaces/ICreateCompany';

export default class CompanyRepository implements ICompanyRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(Company);
  }

  public async createCompany(data: ICreateCompany): Promise<Company> {
    const company = this.ormRepository.create({
      name: data.name,
      email: data.email,
      fantasy_name: data.fantasy_name,
      password: data.password,
      cnpj: data.cnpj,
    });

    await this.ormRepository.save(company);

    return company;
  }

  public async findByEmailOrCnpj(
    email = '',
    cnpj = '',
  ): Promise<Company | undefined> {
    const company = this.ormRepository
      .createQueryBuilder('company')
      .where('company.email = :email', { email })
      .orWhere('company.cnpj = :cnpj', { cnpj })
      .getOne();

    return company;
  }

  public async findOneByEmail(email: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: { email },
    });
    return company;
  }

  public async getCompanyWithPassword(
    email: string,
  ): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({
      where: { email },
      select: ['id', 'password', 'email'],
    });
    return company;
  }

  public async findOneById(id: number): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);

    return company;
  }
}
