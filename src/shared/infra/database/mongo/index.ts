/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import { Guard } from '../../../core/Guard';
import { Result } from '../../../core/Result';
import { MongoClient } from 'mongodb';
// import Logger from '../../../utils/LoggerUtils';

dotenv.config();

interface Credentials {
  db: string | undefined;
  url: string | undefined;
  port: string | undefined;
  user: string | undefined;
  password: string | undefined;
}

const credentials: Credentials = {
  db: process.env.MONGO_DB,
  url: process.env.MONGO_URL,
  port: process.env.MONGO_PORT,
  user: process.env.MONGO_USER,
  password: process.env.MONGO_PASSWORD,
};

export class Mongo {
  private mongoClient!: MongoClient;
  private uri: string | undefined;

  constructor() {
    this.init();
  }

  private init() {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: credentials.db, argumentName: 'db' },
      { argument: credentials.url, argumentName: 'url' },
      { argument: credentials.port, argumentName: 'port' },
      { argument: credentials.user, argumentName: 'user' },
      { argument: credentials.password, argumentName: 'password' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Mongo>(guardResult.message as string);
    }

    if (process.env.NODE_ENV === 'test') {
      // eslint-disable-next-line max-len
      this.uri = `mongodb://${credentials.url as string}:${credentials.port as string}/${
        credentials.db as string
      }?authSource=admin`;
    } else {
      this.uri = `mongodb+srv://${credentials.user as string}:${credentials.password as string}@${
        credentials.url as string
      }`;
    }

    void this.openConnect();
    // Logger.info(`[MONGO] [INIT] [URI] [${this.uri}]`);
  }

  private async openConnect(): Promise<MongoClient> {
    if (!this.mongoClient) {
      this.mongoClient = await MongoClient.connect(this.uri as string, {
        useNewUrlParser: true,
      });
      // Logger.info('[OpenConnect] [OK]');
      return this.mongoClient;
    } else {
      return this.mongoClient;
    }
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async getCollection(collection: string) {
    try {
      if (!this.mongoClient) {
        const getCollection = await this.mongoClient.db(credentials.db).collection(collection);
        // Logger.info(`[GetCollection] [OK] [Collection: ${collection}]`);
        return getCollection;
      }
    } catch (error) {
      // Logger.error(`[GetCollection] [FAIL] [${error.message as string}]`);
      // throw new HttpError(GENERIC_ERROR, error.message);
    }
  }

  async closeConnect(): Promise<void> {
    try {
      if (this.mongoClient) {
        await this.mongoClient.close();
        // Logger.info('[CloseConnect] [OK]');
      }
    } catch (error) {
      // Logger.error(`[CloseConnect] [FAIL] [${error as string}]`);
      // throw new HttpError(GENERIC_ERROR, 'Close connect error');
    }
  }
}
