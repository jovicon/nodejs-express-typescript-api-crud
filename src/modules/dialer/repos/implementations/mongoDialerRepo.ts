/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dotenv from 'dotenv';
import { injectable } from 'tsyringe';
import { IDialerRepo } from '../dialerRepo';
import { Dialer } from '../../domain/dialer';
import { Mongo } from '../../../../shared/infra/database/mongo/index';
import Logger from '../../../../shared/utils/LoggerUtils';

dotenv.config();

@injectable()
export class MongoDialerRepo implements IDialerRepo {
  private mongo: Mongo = new Mongo();
  private logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async save(dialer: Dialer): Promise<void> {
    try {
      await this.mongo.openConnect();
      const collectionLeadHistory = await this.mongo
        .getCollection(process.env.DIALER_COLLECTION as string)
        .then((result) => result);

      if (collectionLeadHistory) {
        await collectionLeadHistory
          .insertOne({
            ...dialer.dialerToJson,
          })
          .catch((error: any) => {
            // eslint-disable-next-line curly
            if (this.logger)
              this.logger.error(`[path] [FAILED] [Mongo insert one] [${error.message as string}]`);
            // throw new HttpError('ERROR_MONGO_INSERT_ONE', 'Mongo insert one element');
          });
      }

      if (this.logger) this.logger.info('[path] [MongoDialerRepo] [OK] [Insert URL in Mongo]');
    } catch (error) {
      // eslint-disable-next-line curly
      if (this.logger)
        this.logger.error(`[path] [MongoDialerRepo] [ERROR] [${error.message as string}]`);
    } finally {
      await this.mongo.closeConnect();
    }
  }
}
