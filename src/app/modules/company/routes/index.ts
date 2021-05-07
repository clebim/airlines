import { Router } from 'express';
import CompanyAirportController from '../http/CompanyAirportController';
import CompanyController from '../http/CompanyController';

const routes = Router();

routes.post('/auth/register', CompanyController.create);
routes.post('/airport_relationship', CompanyAirportController.create);
routes.get(
  '/airports/index/:id',
  CompanyAirportController.IndexAirportsByCompany,
);

export default routes;
