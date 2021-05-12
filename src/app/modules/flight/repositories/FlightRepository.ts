import connection from '@config/ConnectionDatabaseConfig';
import Flight from '@modules/typeorm/entities/Flight';
import { getConnection, Repository } from 'typeorm';
import ICreateFlight from '../interfaces/ICreateFlight';
import IFlightRepository from '../interfaces/IFlightRepository';
import ISearchFlightsByDate from '../interfaces/ISearchFlightsByDate';

export default class FlightRepository implements IFlightRepository {
  private ormRepository: Repository<Flight>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(Flight);
  }

  public async findById(flightId: number): Promise<Flight | undefined> {
    const flight = this.ormRepository.findOne({
      where: {
        id: flightId,
      },
    });

    return flight;
  }

  public async listFlightsByDate(
    data: ISearchFlightsByDate,
  ): Promise<Flight[]> {
    const flights = await this.ormRepository.find({
      where: {
        day_week: data.date,
        company_id: data.companyId,
      },
      relations: ['airport_origin', 'airport_destiny'],
      order: {
        exit_at: 'ASC',
      },
    });

    return flights;
  }

  public async listDestinyByOrigin(originId: number): Promise<Flight[]> {
    const flights = this.ormRepository
      .createQueryBuilder('flights')
      .innerJoin('flights.airport_origin', 'airport')
      .innerJoin('flights.airport_destiny', 'airport_destiny')
      .where('flights.airport_origin_id = :id', { id: originId })
      .select([
        'flights.id',
        'airport.nickname',
        'airport_destiny.name',
        'airport_destiny.nickname',
        'airport_destiny.city',
      ])
      .distinctOn(['flights.airport_destiny_id'])
      .getMany();

    return flights;
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
