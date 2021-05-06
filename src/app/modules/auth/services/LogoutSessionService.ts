import AppError from 'errors/AppError';
import { injectable, inject } from 'tsyringe';
import IBlacklistJwtRepository from '../interfaces/IBlacklistJwtRepository';
import ILogoutServiceResponse from '../interfaces/ILogoutServiceResponse';

@injectable()
export default class LogoutSessionService {
  constructor(
    @inject('BlacklistJwtRepository')
    private blacklistJwtRepository: IBlacklistJwtRepository,
  ) {}

  public async execute(
    tokenId: string,
    companyId: number,
  ): Promise<ILogoutServiceResponse> {
    if (tokenId === null || companyId === null) {
      throw new AppError('Erro interno no servidor', 500);
    }

    await this.blacklistJwtRepository.create(tokenId, companyId);

    return {
      success: true,
      message: 'Token inválidado com sucesso e sessão encerrada',
    };
  }
}
