import Company from '@modules/typeorm/entities/Company';
import AppError from 'errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICompanyRepository from '../interfaces/ICompanyRepository';
import ICreateCompany from '../interfaces/ICreateCompany';
import { companySchemaValidator } from '../validators/CreateUserValidator';

interface ICreateCompanyServiceResponse {
  success: boolean;
  message: string;
  company: Company;
}

@injectable()
export default class CreateCompanyService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(
    data: ICreateCompany,
  ): Promise<ICreateCompanyServiceResponse> {
    // make the necessary validations;
    if (
      !companySchemaValidator.isValidSync(data, {
        abortEarly: true,
      })
    ) {
      const errorMessage: string = await companySchemaValidator
        .validate(data, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      throw new AppError(errorMessage, 422);
    }

    const { password, confirmation_password } = data;

    if (password !== confirmation_password) {
      throw new AppError('Senhas estão diferentes', 422);
    }

    const companyExists = await this.companyRepository.findByEmailOrCnpj(
      data.email,
      data.cnpj,
    );

    if (companyExists) {
      throw new AppError(
        'Ja possui uma compania com email e/ou cnpj cadastrado',
        401,
      );
    }

    const newCompany = await this.companyRepository.createCompany(data);

    newCompany.password = 'Não visualizavel';

    return {
      success: true,
      message: 'Compania criada com sucesso',
      company: newCompany,
    };
  }
}
