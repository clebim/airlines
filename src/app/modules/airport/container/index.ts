import { container } from 'tsyringe';
import IAirportRepository from '../interfaces/IAirportRepository';
import AirportRepository from '../repositories/AirportRepository';

container.registerSingleton<IAirportRepository>(
  'AirportRepository',
  AirportRepository,
);
