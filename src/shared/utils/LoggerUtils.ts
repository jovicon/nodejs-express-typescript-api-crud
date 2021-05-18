import chalk from 'chalk';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line no-console
const log = console.log;

export default class Logger {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  private static id = uuidv4() as string;

  private static getTimeStamp() {
    return moment.utc(moment.utc()).local().format('DD-MM-YYYY HH:mm:ss.SSS').toString();
  }

  static server = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SERVER]'}`),
      chalk.bold.green(message)
    );
  };

  static success = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SUCCESS]'}`),
      chalk.bold.green(message)
    );
  };

  static info = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.italic.green(`${'[SUCCESS]'}`),
      chalk.italic.green(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[INFO]'}`, message);
  };

  static debug = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.blue(`${'[SUCCESS]'}`),
      chalk.bold.blue(message)
    );
  };

  static warn = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.yellow(`${'[SUCCESS]'}`),
      chalk.bold.yellow(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[WARN]'}`, message);
  };

  static error = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.red(`${'[SUCCESS]'}`),
      chalk.bold.red(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[ERROR]'}`, message);
  };
}
