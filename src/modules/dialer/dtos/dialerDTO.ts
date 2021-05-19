import { ContactDTO } from './contactDTO';

export interface DialerDTO {
  executiveID: string;
  phone: string;
  contactData?: ContactDTO;
  createdAt: Date;
  updatedAt: Date;
}
