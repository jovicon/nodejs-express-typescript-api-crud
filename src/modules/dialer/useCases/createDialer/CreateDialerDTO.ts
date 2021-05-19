import { ContactProps } from '../../domain/contact/contact';

export interface CreateDialerDTO {
  executiveID: string;
  phone: string;
  contactData?: ContactProps;
}
