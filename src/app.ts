import 'reflect-metadata';
import './boostrap';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import './shared/container/index';
import './database/index';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // eslint-disable-next-line no-console
  console.log(err);

  return response.status(500).json({
    success: false,
    message: 'Internal sever error',
  });
});

export default app;
