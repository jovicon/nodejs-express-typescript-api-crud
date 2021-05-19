import { CreateDialer } from './CreateDialer';
import { dialerRepo } from '../../repos';
import { CreateDialerController } from './CreateDialerController';
import Logger from '../../../../shared/utils/LoggerUtils';

const logger = new Logger();
const repo = new dialerRepo(logger);

const createDialer = new CreateDialer(repo);
const createDialerController = new CreateDialerController(createDialer);

export { createDialer, createDialerController };
