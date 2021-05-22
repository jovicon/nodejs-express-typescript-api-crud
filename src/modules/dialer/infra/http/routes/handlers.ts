import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { dialerRepo, CreateDialer, CreateDialerController } from '../../../useCases/createDialer';
import Logger from '../../../../../shared/utils/LoggerUtils';

export const createDialerHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const logger = new Logger();
    logger.info('[createDialerHandler] [BEGIN]');
    const loggerContainer = container.register('logger', { useValue: logger });

    const dialerRepository = loggerContainer.resolve(dialerRepo);
    loggerContainer.register('dialerRepo', { useValue: dialerRepository });

    const createDialer = container.resolve(CreateDialer);
    // const createDialer = new CreateDialer(dialerRepository);

    loggerContainer.register('useCase', { useValue: createDialer });
    const createDialerController = loggerContainer.resolve(CreateDialerController);
    // const createDialerController = new CreateDialerController(createDialer);

    return await createDialerController.execute(req, res);
  } catch (error) {
    // logger.error(`[createDialerHandler] ${error as string}`);
    throw new Error(`${error as string}`);
  }
};
