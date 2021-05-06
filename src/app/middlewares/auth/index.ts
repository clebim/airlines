/* eslint-disable radix */
import AuthConfig from '@config/AuthConfig';
import connection from '@config/ConnectionDatabaseConfig';
import BlacklistJwt from '@modules/typeorm/entities/BlacklistJwt';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { getConnection } from 'typeorm';

interface TokenPayload {
  iat: number;
  exp: number;
  user_id: string;
  token_id: string;
}

export default async function (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<Response | void> {
  const authHeader = request.headers.authorization;

  const blackListRepository = getConnection(connection).getRepository(
    BlacklistJwt,
  );

  if (!authHeader) {
    return response.json({
      success: false,
      message: 'Token JWT é obrigatório',
    });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, AuthConfig.secret as string);

    const { user_id, token_id } = decoded as TokenPayload;

    const tokenIdExists = await blackListRepository.findOne({
      where: {
        token_id,
      },
    });

    if (tokenIdExists) {
      return response.json({
        success: false,
        message: 'Token JWT não é mais válido',
      });
    }

    request.userId = parseInt(user_id);
    request.tokenId = token_id;

    return next();
  } catch {
    return response.json({
      success: false,
      message: 'Token Jwt é inválido',
    });
  }
}
