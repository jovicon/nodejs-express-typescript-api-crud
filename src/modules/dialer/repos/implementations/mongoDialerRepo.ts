/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import moment from 'moment';
import * as dotenv from 'dotenv';
import { injectable, inject } from 'tsyringe';
import { IDialerRepo } from '../dialerRepo';
import { Dialer } from '../../domain/dialer';
import { Mongo } from '../../../../shared/infra/database/mongo/index';
import { ILogger } from '../../../../shared/utils/logger/ILogger';

dotenv.config();

@injectable()
export class MongoDialerRepo implements IDialerRepo {
  private mongo: Mongo = new Mongo();
  private logger: ILogger;

  constructor(@inject('logger') logger: ILogger) {
    this.logger = logger;
  }

  async save(dialer: Dialer): Promise<void> {
    try {
      await this.mongo.openConnect();
      const collectionLeadHistory = await this.mongo
        .getCollection(process.env.DIALER_COLLECTION as string)
        .then((result) => result);

      const now = moment.utc(moment.utc()).local().format('DD-MM-YYYY HH:mm:ss');
      if (collectionLeadHistory) {
        await collectionLeadHistory
          .insertOne({
            ...dialer.dialerToJson,
            createdAt: now,
            updatedAt: now,
          })
          .catch((error: any) => {
            this.logger.error(`[MongoDialerRepo] [Mongo insert one] [${error.message as string}]`);
          });
      }

      this.logger.info('[MongoDialerRepo] [OK]');
    } catch (error) {
      this.logger.error(`[MongoDialerRepo] [ERROR] [${error.message as string}]`);
      throw Error(`${error.message as string}`);
    } finally {
      await this.mongo.closeConnect();
    }
  }
}
