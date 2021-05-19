import express from 'express';
import { dialerRouter } from '../../../../modules/dialer/infra/http/routes';

const v1Router = express.Router();

v1Router.get('/', (_req, res) => {
  return res.json({ ping: 'pong' });
});

v1Router.use('/dialer', dialerRouter);

export { v1Router };
