import { Dialer } from '../domain/dialer';

export interface IDialerRepo {
  save(dialer: Dialer): Promise<void>;
}
