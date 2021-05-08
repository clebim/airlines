import { Router } from 'express';
import FlightController from '../http/FlightController';

const routes = Router();

routes.post('/flights/create', FlightController.create);

export default routes;
