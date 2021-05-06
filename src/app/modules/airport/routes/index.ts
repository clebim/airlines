import { Router } from 'express';
import AirportController from '../http/AirportController';

const routes = Router();

routes.get('/airports/index', AirportController.index);
routes.post('/airports/create', AirportController.create);

export default routes;
