import BlacklistJwt from '../../../typeorm/entities/BlacklistJwt';

export default interface IBlacklistJwtRepository {
  create(tokenId: string, companyId: number): Promise<BlacklistJwt>;
}
