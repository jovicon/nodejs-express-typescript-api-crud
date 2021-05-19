import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

interface DialerPhoneProps {
  value: string;
}

export class DialerPhone extends ValueObject<DialerPhoneProps> {
  public static minLength = 2;
  public static maxLength = 12;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: DialerPhoneProps) {
    super(props);
  }

  public static create(props: DialerPhoneProps): Result<DialerPhone> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'phone');

    if (!nullGuardResult.succeeded) {
      return Result.fail<DialerPhone>(nullGuardResult.message as string);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<DialerPhone>(minGuardResult.message as string);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<DialerPhone>(maxGuardResult.message as string);
    }

    return Result.ok<DialerPhone>(new DialerPhone(props));
  }
}
