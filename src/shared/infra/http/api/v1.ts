import express from 'express';
import baseRouter from '../routes';
import { dialerRouter } from '../../../../modules/dialer/infra/http/routes';

const pathBase: string = process.env.PATH_BASE_MS ? process.env.PATH_BASE_MS : '/dialer';

const v1Router = express.Router();

v1Router.use(pathBase, baseRouter);
v1Router.use(pathBase, dialerRouter);

export { v1Router };
