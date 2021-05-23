/* eslint-disable @typescript-eslint/indent */
import { injectable, inject } from 'tsyringe';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { CreateDialer } from './CreateDialer';
import { CreateDialerDTO } from './CreateDialerDTO';
import { DecodedExpressRequest } from '../../infra/http/models/decodedResquest';
import { CreateDialerErrors } from './CreateDialerErrors';
import { ILogger } from '../../../../shared/utils/logger/ILogger';
// import { TextUtils } from '../../../../shared/utils/TextUtils';
// import * as express from 'express';
@injectable()
export class CreateDialerController extends BaseController {
  private useCase: CreateDialer;
  private logger: ILogger;

  constructor(useCase: CreateDialer, @inject('logger') logger: ILogger) {
    super();
    this.useCase = useCase;
    this.logger = logger;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
    // TODO: sanitize data IN
    const dto: CreateDialerDTO = {
      executiveID: req.body.executiveID,
      phone: req.body.phone,
      contactData: req.body.contactData,
      // title: TextUtils.sanitize(req.body.title),
      // text: !!req.body.text ? TextUtils.sanitize(req.body.text) : null,
      // userId: userId,
      // postType: req.body.postType,
      // link: !!req.body.link ? TextUtils.sanitize(req.body.link) : null,
    };

    try {
      const result = await this.useCase.execute(dto);
      this.logger.info(`[CreateDialerController] [use case result] ${JSON.stringify(result)}`);

      if (result.isLeft()) {
        const error = result.value;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const errorMessage: string = error.errorValue().message
          ? error.errorValue().message
          : error.errorValue();

        this.logger.error(`[CreateDialerController] ${errorMessage}`);
        switch (error.constructor) {
          case CreateDialerErrors.DialerDoesntExistError:
            return this.notFound(res, errorMessage);
          default:
            return this.fail(res, errorMessage);
        }
      } else {
        this.logger.info('[CreateDialerController] [OK]');
        return this.ok(res, 'dialer saved successfully');
      }
    } catch (error) {
      this.logger.error(`[CreateDialerController] ${error.message as string}`);
      this.logger.error(`[CreateDialerController] ${JSON.stringify(error)}`);
      return this.fail(res, error);
    }
  }
}
