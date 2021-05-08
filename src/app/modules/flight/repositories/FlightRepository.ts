import connection from '@config/ConnectionDatabaseConfig';
import Flight from '@modules/typeorm/entities/Flight';
import { getConnection, Repository } from 'typeorm';
import ICreateFlight from '../interfaces/ICreateFlight';
import IFlightRepository from '../interfaces/IFlightRepository';

export default class FlightRepository implements IFlightRepository {
  private ormRepository: Repository<Flight>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(Flight);
  }

  public async create(data: ICreateFlight): Promise<Flight> {
    const newFlight = this.ormRepository.create({
      name: data.name,
      company_id: data.companyId,
      airport_origin_id: data.airportOriginId,
      airport_destiny_id: data.airportDestinyId,
      airplane_model: data.airplaneModel,
      day_week: data.dayWeek,
      exit_at: data.exitAt,
      price: data.price,
      capacity: data.capacity,
    });

    await this.ormRepository.save(newFlight);

    return newFlight;
  }
}
