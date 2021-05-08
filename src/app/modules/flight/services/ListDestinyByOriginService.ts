import { inject, injectable } from 'tsyringe';
import IFlightRepository from '../interfaces/IFlightRepository';

interface AirportMin {
  nickname: string;
  name: string;
  city: string;
}

interface ServiceResponse {
  success: boolean;
  message: string;
  airports: AirportMin[];
}

@injectable()
export default class ListDestinyByOriginService {
  constructor(
    @inject('FlightRepository')
    private flightRepository: IFlightRepository,
  ) {}

  public async execute(originId: number): Promise<ServiceResponse> {
    const flights = await this.flightRepository.listDestinyByOrigin(originId);

    const airports: AirportMin[] = [];

    flights.forEach(flight =>
      airports.push({
        nickname: flight.airport_destiny.nickname,
        name: flight.airport_destiny.name,
        city: flight.airport_destiny.city,
      }),
    );

    return {
      success: true,
      message: 'Aeroportos obtidos com sucesso',
      airports,
    };
  }
}
