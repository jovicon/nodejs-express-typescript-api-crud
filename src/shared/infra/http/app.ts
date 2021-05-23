/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import listEndpoints from 'express-list-endpoints';
import { HttpLoggerCreator } from '../../utils/logger';
import { v1Router } from './api/v1';

dotenv.config();

/**
 * App Variables
 */
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const app = express();
const loggerCreator = new HttpLoggerCreator();
const logger = loggerCreator.factoryMethod();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1Router);

/**
 * Server Activation
 */
app.listen(PORT, () => {
  logger.server('|------------------------------------------------------------------|');
  logger.server('| JOVICON');
  logger.server('|------------------------------------------------------------------|');
  logger.server('| TEMPLATE EXPRESS TYPESCRIPT MS');
  logger.server(`| Server REST OK: Port ${PORT}`);
  logger.server('|------------------------------------------------------------------|');
  logger.server('| Routes Enabled');
  logger.server('|------------------------------------------------------------------|');
  listEndpoints(app).forEach((route: any, index: number) => {
    logger.server(`${index + 1}.- ${JSON.stringify(route)}`);
  });
  logger.server('|------------------------------------------------------------------|\n');
});
