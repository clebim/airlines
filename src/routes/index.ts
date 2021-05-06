import { Router } from 'express';
import CompanyRoutes from '../app/modules/company/routes';
import AuthRoutes from '../app/modules/auth/routes';
import AirportRoutes from '../app/modules/airport/routes';

const routes = Router();

routes.use(CompanyRoutes);
routes.use(AuthRoutes);
routes.use(AirportRoutes);

export default routes;
