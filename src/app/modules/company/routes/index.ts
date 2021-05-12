import { Router } from 'express';
import CompanyAirportController from '../http/CompanyAirportController';
import CompanyController from '../http/CompanyController';
import AuthMiddleware from '../../../middlewares/auth/index';

const routes = Router();

routes.post('/auth/register', CompanyController.create);
routes.post(
  '/airport_relationship',
  AuthMiddleware,
  CompanyAirportController.create,
);
routes.get(
  '/airports/index/:id',
  AuthMiddleware,
  CompanyAirportController.IndexAirportsByCompany,
);

export default routes;
