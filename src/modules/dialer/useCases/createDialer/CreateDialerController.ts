/* eslint-disable @typescript-eslint/indent */
import { injectable } from 'tsyringe';
import { BaseController } from '../../../../shared/infra/http/models/BaseController';
import { CreateDialer } from './CreateDialer';
import { CreateDialerDTO } from './CreateDialerDTO';
import { DecodedExpressRequest } from '../../infra/http/models/decodedResquest';
import { CreateDialerErrors } from './CreateDialerErrors';
// import { TextUtils } from '../../../../shared/utils/TextUtils';
// import * as express from 'express';
@injectable()
export class CreateDialerController extends BaseController {
  private useCase: CreateDialer;

  constructor(useCase: CreateDialer) {
    super();
    this.useCase = useCase;
  }

  async executeImpl(req: DecodedExpressRequest, res: any): Promise<any> {
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

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case CreateDialerErrors.MemberDoesntExistError:
            return this.notFound(res, error.errorValue().message);
          default:
            return this.fail(res, error.errorValue().message);
        }
      } else {
        return this.ok(res);
      }
    } catch (err) {
      return this.fail(res, err);
    }
  }
}
