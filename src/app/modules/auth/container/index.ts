import { container } from 'tsyringe';
import IBlacklistJwtRepository from '../interfaces/IBlacklistJwtRepository';
import BlacklistRepository from '../repositories/BlacklistJwtRepository';

container.registerSingleton<IBlacklistJwtRepository>(
  'BlacklistJwtRepository',
  BlacklistRepository,
);
