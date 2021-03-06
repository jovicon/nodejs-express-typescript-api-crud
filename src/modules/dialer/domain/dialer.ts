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

interface DialerJson {
  executiveID: string;
  phone: string;
  contactData?: ContactProps;
}

// Factory method
export class Dialer extends AggregateRoot<DialerProps> {
  private constructor(props: DialerProps) {
    super(props);
  }

  get dialerToJson(): DialerJson {
    const dialer: DialerJson = {
      executiveID: this.props.executiveID.value,
      phone: this.props.phone.value,
      contactData: {
        name: this.props.contactData?.name,
        rut: this.props.contactData?.rut,
        phone: this.props.contactData?.phone,
        email: this.props.contactData?.email,
        note: this.props.contactData?.note,
      },
    };
    return dialer;
  }

  public static create(props: DialerProps): Result<Dialer> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.executiveID, argumentName: 'executiveID' },
      { argument: props.phone, argumentName: 'phone' },
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Dialer>(guardResult.message as string);
    }

    const dialer = new Dialer({
      ...props,
    });

    // TODO: domain events
    // if (isNewUser) {
    //   user.addDomainEvent(new UserCreated(user));
    // }

    return Result.ok<Dialer>(dialer);
  }
}
