import Flight from '@modules/typeorm/entities/Flight';
import ICreateFlight from './ICreateFlight';

export default interface IFlightRepository {
  create(data: ICreateFlight): Promise<Flight>;
  listDestinyByOrigin(originId: number): Promise<Flight[]>;
}
