import { Request, Response } from 'express';
import { CreateDialerController, dialerRepo, CreateDialer } from '../../../useCases/createDialer';
import Logger from '../../../../../shared/utils/LoggerUtils';

export const createDialerHandler = async (req: Request, res: Response): Promise<void> => {
  const logger = new Logger();
  try {
    const repo = new dialerRepo(logger);
    const createDialer = new CreateDialer(repo);
    const createDialerController = new CreateDialerController(createDialer);

    return await createDialerController.execute(req, res);
  } catch (error) {
    logger.error(`[createDialerHandler] ${error as string}`);
    throw new Error(`${error as string}`);
  }
};
