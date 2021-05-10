import Flight from '@modules/typeorm/entities/Flight';
import ICreateFlight from './ICreateFlight';
import ISearchFlightsByDate from './ISearchFlightsByDate';

export default interface IFlightRepository {
  create(data: ICreateFlight): Promise<Flight>;
  listDestinyByOrigin(originId: number): Promise<Flight[]>;
  listFlightsByDate(data: ISearchFlightsByDate): Promise<Flight[]>;
}
