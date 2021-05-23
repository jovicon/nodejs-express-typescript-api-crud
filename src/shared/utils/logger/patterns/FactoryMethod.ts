/* eslint-disable max-classes-per-file */
import { ILogger } from '../ILogger';
import chalk from 'chalk';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line no-console
const log = console.log;

abstract class LoggerCreator {
  public abstract factoryMethod(): ILogger;
}

export class HttpLoggerCreator extends LoggerCreator {
  public factoryMethod(): ILogger {
    return new HttpLogger();
  }
}

class HttpLogger implements ILogger {
  public id: string;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {
    this.id = uuidv4();
  }

  private static getTimeStamp(): string {
    return moment.utc(moment.utc()).local().format('DD-MM-YYYY HH:mm:ss.SSS').toString();
  }

  public server = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SERVER]'}`),
      chalk.bold.green(message)
    );
  };

  public success = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.bold.green(`${'[SUCCESS]'}`),
      chalk.bold.green(message)
    );
  };

  public info = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.italic.green(`${'[INFO]'}`),
      chalk.italic.green(message)
    );
  };

  public debug = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.bold.blue(`${'[DEBUG]'}`),
      chalk.bold.blue(message)
    );
  };

  public warn = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.bold.yellow(`${'[WARN]'}`),
      chalk.bold.yellow(message)
    );
  };

  public error = (message: string): void => {
    log(
      chalk.white(`${`[${this.id}]`}`),
      chalk.white(`${`[${HttpLogger.getTimeStamp()}]`}`),
      chalk.bold.red(`${'[ERROR]'}`),
      chalk.bold.red(message)
    );
  };
}
