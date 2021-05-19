import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { ExecutiveID } from './dialerExecutiveId';
import { ContactProps } from './contact/contact';
import { DialerPhone } from './dialerPhone';

export interface DialerProps {
  executiveID: ExecutiveID;
  phone: DialerPhone;
  contactData?: ContactProps;
}

export class Dialer extends AggregateRoot<DialerProps> {
  private constructor(props: DialerProps) {
    super(props);
  }

  // TODO: metodo para poder recibir todos los valores en JSON

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
