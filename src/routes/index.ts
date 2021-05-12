import { Router } from 'express';
import AuthMiddleware from '../app/middlewares/auth/index';
import CompanyRoutes from '../app/modules/company/routes';
import AuthRoutes from '../app/modules/auth/routes';
import AirportRoutes from '../app/modules/airport/routes';
import FlightRoutes from '../app/modules/flight/routes';
import TicketRoutes from '../app/modules/ticket/routes';

const routes = Router();

routes.use(AuthRoutes);
routes.use(CompanyRoutes);

routes.use(AuthMiddleware);
routes.use(AirportRoutes);
routes.use(FlightRoutes);
routes.use(TicketRoutes);

export default routes;
