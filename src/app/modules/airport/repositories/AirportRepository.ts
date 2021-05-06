import connection from '@config/ConnectionDatabaseConfig';
import Airport from '@modules/typeorm/entities/Airport';
import { getConnection, Repository } from 'typeorm';
import IAirportRepository from '../interfaces/IAirportRepository';
import ICreateAirport from '../interfaces/ICreateAirport';

export default class AirportRepository implements IAirportRepository {
  private ormRepository: Repository<Airport>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(Airport);
  }

  public async create(data: ICreateAirport): Promise<Airport> {
    const newAirport = this.ormRepository.create({
      name: data.name,
      nickname: data.nickname,
      city: data.city,
    });

    await this.ormRepository.save(newAirport);

    return newAirport;
  }

  public async findAll(): Promise<Airport[]> {
    const airports = this.ormRepository.find();

    return airports;
  }
}
