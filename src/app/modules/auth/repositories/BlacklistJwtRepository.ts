import { getConnection, Repository } from 'typeorm';
import connection from '../../../../config/ConnectionDatabaseConfig';
import BlacklistJwt from '../../../typeorm/entities/BlacklistJwt';
import IBlacklistJwtRepository from '../interfaces/IBlacklistJwtRepository';

export default class BlacklistRepository implements IBlacklistJwtRepository {
  private ormRepository: Repository<BlacklistJwt>;

  constructor() {
    this.ormRepository = getConnection(connection).getRepository(BlacklistJwt);
  }

  public async create(
    tokenId: string,
    companyId: number,
  ): Promise<BlacklistJwt> {
    const newBlacklist = this.ormRepository.create({
      token_id: tokenId,
      company_id: companyId,
    });

    await this.ormRepository.save(newBlacklist);

    return newBlacklist;
  }
}
