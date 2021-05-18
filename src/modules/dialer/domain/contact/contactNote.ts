import { ValueObject } from '../../../../shared/domain/ValueObject';
import { Result } from '../../../../shared/core/Result';
import { Guard } from '../../../../shared/core/Guard';

interface ContactNoteProps {
  value: string;
}

export class ContactNote extends ValueObject<ContactNoteProps> {
  public static minLength = 2;
  public static maxLength = 1000;

  get value(): string {
    return this.props.value;
  }

  private constructor(props: ContactNote) {
    super(props);
  }

  public static create(props: ContactNote): Result<ContactNoteProps> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'note');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ContactNoteProps>(nullGuardResult.message as string);
    }

    const minGuardResult = Guard.againstAtLeast(this.minLength, props.value);
    const maxGuardResult = Guard.againstAtMost(this.maxLength, props.value);

    if (!minGuardResult.succeeded) {
      return Result.fail<ContactNoteProps>(minGuardResult.message as string);
    }

    if (!maxGuardResult.succeeded) {
      return Result.fail<ContactNoteProps>(maxGuardResult.message as string);
    }

    return Result.ok<ContactNoteProps>(new ContactNote(props));
  }
}
