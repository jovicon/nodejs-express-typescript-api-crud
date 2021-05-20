/* eslint-disable @typescript-eslint/no-misused-promises */
import express from 'express';
import { createDialerHandler } from './handlers';

const dialerRouter = express.Router();

// dialerRouter.post('/', (req, res) => {
//   void (async () => {
//     await createDialerHandler(req, res)
//       .then(() => res.status(200))
//       .catch((error) => {
//         res.status(500).send({
//           error: error as string,
//         });
//       });
//   })();
// });

dialerRouter.post('/', async (req, res) => {
  try {
    await createDialerHandler(req, res);
    res.status(200);
  } catch (error) {
    res.status(500).send({
      error: error as string,
    });
  }
});

export { dialerRouter };
