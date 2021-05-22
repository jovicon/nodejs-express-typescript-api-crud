import express from 'express';
import { createDialerHandler } from './handlers';

const dialerRouter = express.Router();

dialerRouter.post('/', (req, res) => {
  void (async () => {
    await createDialerHandler(req, res)
      .then(() => res.status(200))
      .catch((error) => {
        res.status(500).send({
          error: error.message as string,
        });
      });
  })();
});

export { dialerRouter };
