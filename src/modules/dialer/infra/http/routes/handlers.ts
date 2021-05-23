import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { dialerRepo, CreateDialer, CreateDialerController } from '../../../useCases/createDialer';
import { ILogger } from '../../../../../shared/utils/logger/ILogger';

export const createDialerHandler = async (
  req: Request,
  res: Response,
  logger: ILogger
): Promise<void> => {
  logger.info('[createDialerHandler] [BEGIN]');
  try {
    const createDialerHandlerContainer = container.register('logger', { useValue: logger });

    const dialerRepository = createDialerHandlerContainer.resolve(dialerRepo);
    createDialerHandlerContainer.register('dialerRepo', { useValue: dialerRepository });

    const createDialer = container.resolve(CreateDialer);
    createDialerHandlerContainer.register('useCase', { useValue: createDialer });

    const createDialerController = createDialerHandlerContainer.resolve(CreateDialerController);

    const result = await createDialerController.execute(req, res);

    logger.info('[createDialerHandler] [END]');
    return result;
  } catch (error) {
    logger.error(`[createDialerHandler] ${error as string}`);
    logger.info('[createDialerHandler] [END]');
    throw new Error(`${error as string}`);
  }
};
