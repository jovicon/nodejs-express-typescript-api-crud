import { ValueObject } from '../../../../shared/domain/ValueObject';
import { Result } from '../../../../shared/core/Result';
import { Guard } from '../../../../shared/core/Guard';

interface ContactNameProps {
  value: string | undefined;
}

export class ContactName extends ValueObject<ContactNameProps> {
  public static minLength = 2;
  public static maxLength = 50;

  get value(): string | undefined {
    return this.props.value;
  }

  private constructor(props: ContactName) {
    super(props);
  }

  public static create(props: ContactName): Result<ContactNameProps> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'name');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ContactNameProps>(nullGuardResult.message as string);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value as string);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value as string);

    if (!minGuardResult.succeeded) {
      return Result.fail<ContactNameProps>(minGuardResult.message as string);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<ContactNameProps>(maxGuardResult.message as string);
    }

    return Result.ok<ContactNameProps>(new ContactName(props));
  }
}
