import { Router } from 'express';
import AuthController from '../http/AuthController';
import AuthMiddleware from '../../../middlewares/auth/index';

const routes = Router();

routes.post('/auth/login', AuthController.createSession);
routes.get('/auth/logout', AuthMiddleware, AuthController.Logout);

export default routes;
