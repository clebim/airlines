import { Router } from 'express';
import TicketController from '../http/TicketController';

const routes = Router();

routes.post('/tickets/store', TicketController.store);

export default routes;
