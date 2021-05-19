import express from 'express';
import { createDialerController } from '../../../useCases/createDialer';
const dialerRouter = express.Router();

// dialerRouter.post('/', middleware.ensureAuthenticated(), (req, res) =>
//   createDialerController.execute(req, res)
// );

// eslint-disable-next-line @typescript-eslint/no-misused-promises
dialerRouter.post('/', (req, res) => createDialerController.execute(req, res));

export { dialerRouter };
