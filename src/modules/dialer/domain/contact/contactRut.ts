import { ValueObject } from '../../../../shared/domain/ValueObject';
import { Result } from '../../../../shared/core/Result';
import { Guard } from '../../../../shared/core/Guard';

interface ContactRutProps {
  value: string;
}

export class ContactRut extends ValueObject<ContactRutProps> {
  public static minLength = 2;
  public static maxLength = 12;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ContactRut) {
    super(props);
  }

  public static create(props: ContactRut): Result<ContactRutProps> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'rut');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ContactRutProps>(nullGuardResult.message as string);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<ContactRutProps>(minGuardResult.message as string);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<ContactRutProps>(maxGuardResult.message as string);
    }

    return Result.ok<ContactRutProps>(new ContactRut(props));
  }
}
