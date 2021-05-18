/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dotenv from 'dotenv';
import { IDialerRepo } from '../dialerRepo';
import { Dialer } from '../../domain/dialer';
import { Mongo } from '../../../../shared/infra/database/mongo/index';
import Logger from '../../../../shared/utils/LoggerUtils';

dotenv.config();

export class MongoDialerRepo implements IDialerRepo {
  private mongo: Mongo = new Mongo();
  private logger: Logger;

  constructor(mongo: Mongo, logger: Logger) {
    this.mongo = mongo;
    this.logger = logger;
  }

  async save(dialer: Dialer): Promise<void> {
    try {
      const collectionLeadHistory = await this.mongo.getCollection(
        process.env.DIALER_COLLECTION as string
      );

      collectionLeadHistory
        .insertOne({
          ...dialer,
        })
        .catch((error: any) => {
          this.logger.error(`[path] [FAILED] [Mongo insert one] [${error.message as string}]`);
          // throw new HttpError('ERROR_MONGO_INSERT_ONE', 'Mongo insert one element');
        });

      this.logger.info('[path] [OK] [Insert URL in Mongo]');
      await this.mongo.closeConnect();
    } catch (error) {
      this.logger.error(`[path] [ERROR] [${error.message as string}]`);
    } finally {
      await this.mongo.closeConnect();
    }
  }
}
