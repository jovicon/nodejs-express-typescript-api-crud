import { ContactProps } from './contact/contact';

export interface JWTClaims {
  executiveID: string;
  phone: string;
  contactData: ContactProps;
}
