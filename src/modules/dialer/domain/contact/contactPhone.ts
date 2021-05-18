import { ValueObject } from '../../../../shared/domain/ValueObject';
import { Result } from '../../../../shared/core/Result';
import { Guard } from '../../../../shared/core/Guard';

interface ContactPhoneProps {
  value: string;
}

export class ContactPhone extends ValueObject<ContactPhoneProps> {
  public static minLength = 2;
  public static maxLength = 12;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ContactPhone) {
    super(props);
  }

  public static create(props: ContactPhone): Result<ContactPhoneProps> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'phone');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ContactPhoneProps>(nullGuardResult.message as string);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<ContactPhoneProps>(minGuardResult.message as string);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<ContactPhoneProps>(maxGuardResult.message as string);
    }

    return Result.ok<ContactPhoneProps>(new ContactPhone(props));
  }
}
