/* eslint-disable @typescript-eslint/indent */
import { injectable, inject } from 'tsyringe';
import { UseCase } from '../../../../shared/core/UseCase';
import { IDialerRepo } from '../../repos/dialerRepo';
import { Either, Result, left, right } from '../../../../shared/core/Result';
import { AppError } from '../../../../shared/core/AppError';
import { CreateDialerDTO } from './CreateDialerDTO';
import { CreateDialerErrors } from './CreateDialerErrors';
import { Dialer, DialerProps } from '../../domain/dialer';
import { ExecutiveID } from '../../domain/dialerExecutiveId';
import { DialerPhone } from '../../domain/dialerPhone';
import { Contact } from '../../domain/contact/contact';
import Logger from '../../../../shared/utils/LoggerUtils';

type Response = Either<
  CreateDialerErrors.MemberDoesntExistError | AppError.UnexpectedError | Result<any>,
  Result<void>
>;
@injectable()
export class CreateDialer implements UseCase<CreateDialerDTO, Promise<Response>> {
  private dialerRepo: IDialerRepo;
  private logger: Logger;

  constructor(@inject('dialerRepo') dialerRepo: IDialerRepo, logger: Logger) {
    this.dialerRepo = dialerRepo;
    this.logger = logger;
  }

  public async execute(request: CreateDialerDTO): Promise<Response> {
    let executiveID: ExecutiveID;
    let phone: DialerPhone;
    let contactData: Contact;
    let dialer: Dialer;

    try {
      const executiveIDOrError = ExecutiveID.create({ value: request.executiveID });

      if (executiveIDOrError.isFailure) {
        return left(executiveIDOrError);
      }

      executiveID = executiveIDOrError.getValue();

      const phoneOrError = DialerPhone.create({ value: request.phone });

      if (phoneOrError.isFailure) {
        return left(executiveIDOrError);
      }

      phone = phoneOrError.getValue();

      const contactOrError = Contact.create({ ...request.contactData });

      if (contactOrError.isFailure) {
        return left(contactOrError);
      }

      contactData = contactOrError.getValue();

      const dialerProps: DialerProps = {
        executiveID,
        phone,
        contactData,
      };

      const postOrError = Dialer.create(dialerProps);

      if (postOrError.isFailure) {
        return left(postOrError);
      }

      dialer = postOrError.getValue();
      this.logger.info(`[CreateDialer] ${JSON.stringify(dialer.dialerToJson)}`);
      await this.dialerRepo.save(dialer);

      return right(Result.ok<void>());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
