import { Router } from 'express';
import CompanyRoutes from '../app/modules/company/routes';
import AuthRoutes from '../app/modules/auth/routes';
import AirportRoutes from '../app/modules/airport/routes';
import FlightRoutes from '../app/modules/flight/routes';

const routes = Router();

routes.use(CompanyRoutes);
routes.use(AuthRoutes);
routes.use(AirportRoutes);
routes.use(FlightRoutes);

export default routes;
