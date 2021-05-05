import { Router } from 'express';
import AuthController from '../http/AuthController';

const routes = Router();

routes.post('/auth/login', AuthController.createSession);

export default routes;
