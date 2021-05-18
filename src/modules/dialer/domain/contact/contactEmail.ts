/* eslint-disable no-useless-escape */
import { Result } from '../../../../shared/core/Result';
import { ValueObject } from '../../../../shared/domain/ValueObject';

export interface ContactEmailProps {
  value: string;
}

export class ContactEmail extends ValueObject<ContactEmailProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ContactEmailProps) {
    super(props);
  }

  private static isValidEmail(email: string) {
    const re =
      // eslint-disable-next-line max-len
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  private static format(email: string): string {
    return email.trim().toLowerCase();
  }

  public static create(email: string): Result<ContactEmail> {
    if (!this.isValidEmail(email)) {
      return Result.fail<ContactEmail>('Email address not valid');
    } else {
      return Result.ok<ContactEmail>(new ContactEmail({ value: this.format(email) }));
    }
  }
}
