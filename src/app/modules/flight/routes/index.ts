import { Router } from 'express';
import FlightController from '../http/FlightController';

const routes = Router();

routes.post('/flights/create', FlightController.create);
routes.get('/flights/list_destinys/:id', FlightController.listDestinyByOrigin);
routes.post(
  '/flights/search_by_date',
  FlightController.searchFlightsByDateService,
);

export default routes;
