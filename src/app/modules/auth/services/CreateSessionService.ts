import ICompanyRepository from '@modules/modules/company/interfaces/ICompanyRepository';
import AppError from 'errors/AppError';
import { inject, injectable } from 'tsyringe';
import AuthConfig from '@config/AuthConfig';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import ISessionData from '../interfaces/ISessionData';
import ISessionServiceResponse from '../interfaces/ISessionServiceResponse';
import { sessionSchemaValidator } from '../validators/CreateSessionValidator';

@injectable()
export default class CreateSessionService {
  constructor(
    @inject('CompanyRepository')
    private companyRepository: ICompanyRepository,
  ) {}

  public async execute(data: ISessionData): Promise<ISessionServiceResponse> {
    if (!sessionSchemaValidator.isValidSync(data, { abortEarly: true })) {
      const errorMessage: string = await sessionSchemaValidator
        .validate(data, {
          abortEarly: true,
        })
        .catch(error => {
          return error.errors[0];
        });

      throw new AppError(errorMessage, 422);
    }

    const { email, password } = data;

    const userExist = await this.companyRepository.getCompanyWithPassword(
      email,
    );

    if (!userExist) {
      throw new AppError('Usuário não encontrado', 401);
    }

    if (!(await bcrypt.compare(password, userExist.password))) {
      throw new AppError('Senha inválida', 401);
    }

    const { id } = userExist;

    const token_id = uuidv4();

    const company = await this.companyRepository.findOneByEmail(email);

    return {
      success: true,
      message: 'Login realizado com sucesso',
      token: jwt.sign({ user_id: id, token_id }, AuthConfig.secret as string, {
        expiresIn: AuthConfig.expiresIn,
      }),
      company,
    };
  }
}
