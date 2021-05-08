import Flight from '@modules/typeorm/entities/Flight';
import { inject, injectable } from 'tsyringe';
import ICreateFlight from '../interfaces/ICreateFlight';
import IFlightRepository from '../interfaces/IFlightRepository';

interface ServiceResponse {
  success: boolean;
  message: string;
  flight: Flight;
}

@injectable()
export default class CreateFlightService {
  constructor(
    @inject('FlightRepository')
    private flightRepository: IFlightRepository,
  ) {}

  public async execute(data: ICreateFlight): Promise<ServiceResponse> {
    const flight = await this.flightRepository.create(data);

    return {
      success: true,
      message: 'Voo criado com sucesso',
      flight,
    };
  }
}
