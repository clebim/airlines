import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ISessionData from '../interfaces/ISessionData';
import CreateSessionService from '../services/CreateSessionService';
import LogoutSessionService from '../services/LogoutSessionService';

export default {
  async createSession(request: Request, response: Response): Promise<Response> {
    const createSessionService = container.resolve<CreateSessionService>(
      CreateSessionService,
    );

    const responseService = await createSessionService.execute(
      request.body as ISessionData,
    );

    return response.status(200).json(responseService);
  },

  async Logout(request: Request, response: Response): Promise<Response> {
    const logoutSessionService = container.resolve<LogoutSessionService>(
      LogoutSessionService,
    );

    const responseService = await logoutSessionService.execute(
      request.tokenId,
      request.userId,
    );

    return response.status(200).json(responseService);
  },
};
