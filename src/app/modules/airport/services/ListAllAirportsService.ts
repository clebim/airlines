import Airport from '@modules/typeorm/entities/Airport';
import { inject, injectable } from 'tsyringe';
import IAirportRepository from '../interfaces/IAirportRepository';

interface serviceResponse {
  success: boolean;
  message: string;
  airports: Airport[];
}

@injectable()
export default class ListAllAirportsService {
  constructor(
    @inject('AirportRepository')
    private airportRepository: IAirportRepository,
  ) {}

  public async execute(): Promise<serviceResponse> {
    const airports = await this.airportRepository.findAll();

    return {
      success: true,
      message: 'Lista de aeroportos obtida com sucesso',
      airports,
    };
  }
}
