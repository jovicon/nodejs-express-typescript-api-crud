import chalk from 'chalk';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line no-console
const log = console.log;

export default class Logger {
  private static id = uuidv4();

  private static getTimeStamp() {
    return moment.utc(moment.utc()).local().format('DD-MM-YYYY HH:mm:ss.SSS').toString();
  }

  public server = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SERVER]'}`),
      chalk.bold.green(message)
    );
  };

  public success = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SUCCESS]'}`),
      chalk.bold.green(message)
    );
  };

  public info = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.italic.green(`${'[SUCCESS]'}`),
      chalk.italic.green(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[INFO]'}`, message);
  };

  public debug = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.blue(`${'[SUCCESS]'}`),
      chalk.bold.blue(message)
    );
  };

  public warn = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.yellow(`${'[SUCCESS]'}`),
      chalk.bold.yellow(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[WARN]'}`, message);
  };

  public error = (message: string): void => {
    log(
      chalk.white(`${`[${Logger.id}]`}`),
      chalk.white(`${`[${Logger.getTimeStamp()}]`}`),
      chalk.bold.red(`${'[SUCCESS]'}`),
      chalk.bold.red(message)
    );
    log(`${`[${Logger.getTimeStamp()}]`}`, `${'[ERROR]'}`, message);
  };
}
