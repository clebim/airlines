import Flight from '@modules/typeorm/entities/Flight';
import { inject, injectable } from 'tsyringe';
import { getDay, parseISO } from 'date-fns';
import { helperDayOfTheWeek } from '@shared/utils/HelperDayOfTheWeek';
import ICompanyRepository from '@modules/modules/company/interfaces/ICompanyRepository';
import AppError from 'errors/AppError';
import IFlightRepository from '../interfaces/IFlightRepository';
import ISearchFlightsByDate from '../interfaces/ISearchFlightsByDate';

interface ServiceResponse {
  success: boolean;
  message: string;
  flights: Flight[];
}

@injectable()
export default class SearchFlightsByDateService {
  constructor(
    @inject('FlightRepository')
    private flightRepository: IFlightRepository,

    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(data: ISearchFlightsByDate): Promise<ServiceResponse> {
    const companyExists = await this.companyRepository.findOneById(
      data.companyId,
    );

    if (!companyExists) {
      throw new AppError('Compania aérea não existe', 400);
    }

    const parseDate = parseISO(data.date);
    const dayWeek = helperDayOfTheWeek[getDay(parseDate)];

    const flights = await this.flightRepository.listFlightsByDate({
      companyId: data.companyId,
      date: dayWeek,
    });

    return {
      success: true,
      message: 'Vôos encontrados com sucesso',
      flights,
    };
  }
}
