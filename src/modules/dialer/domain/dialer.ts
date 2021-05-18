import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { ExecutiveID } from './dialerExecutiveId';
import { ContactData } from './contact/contact';
import { DialerId } from './dialerId';

interface DialerProps {
  executiveID: ExecutiveID;
  contactData?: ContactData;
}

export class Dialer extends AggregateRoot<DialerProps> {
  // get dialerId(): DialerId {
  //   return DialerId.create(this._id).getValue();
  // }

  private constructor(props: DialerProps) {
    super(props);
  }

  public static create(props: DialerProps): Result<Dialer> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.executiveID, argumentName: 'executiveID' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Dialer>(guardResult.message as string);
    }

    const dialer = new Dialer({
      ...props,
    });

    // revisar los dominios
    // if (isNewUser) {
    //   user.addDomainEvent(new UserCreated(user));
    // }

    return Result.ok<Dialer>(dialer);
  }
}
