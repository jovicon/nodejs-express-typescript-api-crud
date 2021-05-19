import { AggregateRoot } from '../../../../shared/domain/AggregateRoot';
import { Result } from '../../../../shared/core/Result';
import { ContactEmail } from './contactEmail';
import { ContactPhone } from './contactPhone';
import { ContactName } from './contactName';
import { ContactNote } from './contactNote';
import { ContactRut } from './contactRut';

export interface ContactProps {
  name?: ContactName;
  rut?: ContactRut;
  phone?: ContactPhone;
  email?: ContactEmail;
  note?: ContactNote;
}

export class Contact extends AggregateRoot<ContactProps> {
  get name(): ContactName | undefined {
    return this.props.name;
  }

  get rut(): ContactRut | undefined {
    return this.props.rut;
  }

  get phone(): ContactPhone | undefined {
    return this.props.phone;
  }

  get email(): ContactEmail | undefined {
    return this.props.email;
  }

  get note(): ContactNote | undefined {
    return this.props.note;
  }

  private constructor(props: ContactProps) {
    super(props);
  }

  public static create(props: ContactProps): Result<Contact> {
    const defaultValues: ContactProps = {
      ...props,
    };

    const contact = new Contact(defaultValues);
    // const isNewMember = !!id === false;

    // if (isNewMember) {
    //   member.addDomainEvent(new MemberCreated(member));
    // }

    return Result.ok<Contact>(contact);
  }
}
