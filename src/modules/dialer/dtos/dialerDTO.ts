import { ContactData } from './contactDTO';

export interface DialerDTO {
  executiveID: string;
  phone: string;
  contactData?: ContactData;
  createdAt: Date;
  updatedAt: Date;
}
