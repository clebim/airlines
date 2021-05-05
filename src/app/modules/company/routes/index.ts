import { Router } from 'express';
import CompanyController from '../http/CompanyController';

const routes = Router();

routes.post('/auth/register', CompanyController.create);

export default routes;
