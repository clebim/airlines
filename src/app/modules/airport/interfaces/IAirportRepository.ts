import Airpot from '@modules/typeorm/entities/Airport';
import ICreateAirport from './ICreateAirport';

export default interface IAirportRepository {
  create(data: ICreateAirport): Promise<Airpot>;
  findAll(): Promise<Airpot[]>;
}
