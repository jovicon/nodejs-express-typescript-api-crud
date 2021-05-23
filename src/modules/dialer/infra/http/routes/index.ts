/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { createDialerHandler } from './handlers';
import { HttpLoggerCreator } from '../../../../../shared/utils/logger';

const dialerRouter = express.Router();

dialerRouter.post('/', async (req, res) => {
  const loggerCreator = new HttpLoggerCreator();
  const logger = loggerCreator.factoryMethod();
  logger.info(`[request ID: ${logger.id}] [path: ${JSON.stringify(req.originalUrl)}] [BEGIN]`);
  try {
    await createDialerHandler(req, res, logger);
  } catch (error) {
    logger.error(
      `[request ID: ${logger.id}] [path: ${JSON.stringify(req.originalUrl)}] ${
        error.message as string
      }`
    );
    res.status(500).send({
      status: 'error',
      message: error.message as string,
    });
  }
  logger.info(`[request ID: ${logger.id}] [path: ${JSON.stringify(req.originalUrl)}] [END]`);
});

export { dialerRouter };
