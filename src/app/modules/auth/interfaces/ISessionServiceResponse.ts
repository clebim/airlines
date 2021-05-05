import Company from '@modules/typeorm/entities/Company';

export default interface ISessionServiceResponse {
  success: boolean;
  message: string;
  token: string;
  company?: Company;
}
