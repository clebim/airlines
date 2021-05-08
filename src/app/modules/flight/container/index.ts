import { container } from 'tsyringe';
import IFlightRepository from '../interfaces/IFlightRepository';
import FlightRepository from '../repositories/FlightRepository';

container.registerSingleton<IFlightRepository>(
  'FlightRepository',
  FlightRepository,
);
