import connection from '@config/ConnectionDatabaseConfig';
import CompanyAirport from '@modules/typeorm/entities/CompanyAirport';
import { getConnection, Repository } from 'typeorm';
import ICompanyAirportRepository, {
  ICreateCompanyAirport,
} from '../interfaces/ICompanyAirportRepository';

export default class CompanyAirportRepository
  implements ICompanyAirportRepository {
  private ormRepository: Repository<CompanyAirport>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(
      CompanyAirport,
    );
  }

  public async create(data: ICreateCompanyAirport): Promise<CompanyAirport> {
    const newRelationship = this.ormRepository.create({
      company_id: data.companyId,
      airport_id: data.airportId,
    });

    await this.ormRepository.save(newRelationship);

    return newRelationship;
  }

  public async findAirportsByCompany(
    companyId: number,
  ): Promise<CompanyAirport[]> {
    const airports = this.ormRepository.find({
      where: {
        company_id: companyId,
      },
      relations: ['airport'],
    });

    return airports;
  }
}
