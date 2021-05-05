import { Router } from 'express';
import CompanyRoutes from '../app/modules/company/routes';
import AuthRoutes from '../app/modules/auth/routes';

const routes = Router();

routes.use(CompanyRoutes);
routes.use(AuthRoutes);

export default routes;
