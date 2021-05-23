/* eslint-disable @typescript-eslint/no-namespace */
import { UseCaseError } from '../../../../shared/core/UseCaseError';
import { Result } from '../../../../shared/core/Result';

export namespace CreateDialerErrors {
  export class DialerDoesntExistError extends Result<UseCaseError> {
    constructor() {
      super(false, {
        message: 'A Dialer doesnt exist for this account.',
      } as UseCaseError);
    }
  }
}
