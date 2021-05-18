import { ContactName } from './contactName';
import { ContactNote } from './contactNote';
import { ContactEmail } from './contactEmail';
import { ContactPhone } from './contactPhone';
import { ContactRut } from './contactRut';

export interface ContactData {
  name?: ContactName;
  rut?: ContactRut;
  phone?: ContactPhone;
  email?: ContactEmail;
  note?: ContactNote;
}
