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

  constructor(logger: Logger) {
    this.logger = logger;
  }

  async save(dialer: Dialer): Promise<void> {
    try {
      this.logger.info(`MongoDialerRepo: ${JSON.stringify(dialer.props)}`);
      const { executiveID, phone, contactData } = dialer.props;
      this.logger.info(`MongoDialerRepo: ${JSON.stringify(executiveID)}`);
      this.logger.info(`MongoDialerRepo: ${JSON.stringify(phone)}`);
      this.logger.info(`MongoDialerRepo: ${JSON.stringify(contactData)}`);

      // const collectionLeadHistory = await this.mongo.getCollection(
      //   process.env.DIALER_COLLECTION as string
      // );

      // collectionLeadHistory
      //   .insertOne({
      //     ...dialer,
      //   })
      //   .catch((error: any) => {
      //     this.logger.error(`[path] [FAILED] [Mongo insert one] [${error.message as string}]`);
      //     // throw new HttpError('ERROR_MONGO_INSERT_ONE', 'Mongo insert one element');
      //   });

      this.logger.info('[path] [OK] [Insert URL in Mongo]');
      await this.mongo.closeConnect();
    } catch (error) {
      this.logger.error(`[path] [ERROR] [${error.message as string}]`);
    } finally {
      await this.mongo.closeConnect();
    }
  }
}
