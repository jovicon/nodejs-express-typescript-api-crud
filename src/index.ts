/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import listEndpoints from 'express-list-endpoints';
import Logger from './shared/utils/LoggerUtils';

dotenv.config();

/**
 * App Variables
 */
const PORT: number = process.env.PORT ? +process.env.PORT : 3000;
const app = express();

/**
 * App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());

/**
 * Server Activation
 */
app.listen(PORT, () => {
  Logger.server('|------------------------------------------------------------------|');
  Logger.server('| CHERNOBYL');
  Logger.server('|------------------------------------------------------------------|');
  Logger.server('| TEMPLATE EXPRESS TYPESCRIPT MS');
  Logger.server(`| Server REST OK: Port ${PORT}`);
  Logger.server('|------------------------------------------------------------------|');
  Logger.server('| Routes Enabled');
  Logger.server('|------------------------------------------------------------------|');
  listEndpoints(app).forEach((route: any, index: number) => {
    Logger.server(`${index + 1}.- ${JSON.stringify(route)}`);
  });
  Logger.server('|------------------------------------------------------------------|\n');
});
