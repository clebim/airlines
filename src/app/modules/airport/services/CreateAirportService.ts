import Airport from '@modules/typeorm/entities/Airport';
import { inject, injectable } from 'tsyringe';
import IAirportRepository from '../interfaces/IAirportRepository';
import ICreateAirport from '../interfaces/ICreateAirport';

@injectable()
export default class CreateAirportService {
  constructor(
    @inject('AirportRepository')
    private airportRepository: IAirportRepository,
  ) {}

  public async execute(data: ICreateAirport): Promise<Airport> {
    const airport = await this.airportRepository.create({
      name: data.name,
      nickname: data.nickname,
      city: data.city,
    });

    return airport;
  }
}
