import { Result } from './Result';
import { UseCaseError } from './UseCaseError';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AppError {
  export class UnexpectedError extends Result<UseCaseError> {
    public constructor(err: string) {
      super(false, {
        message: 'An unexpected error occurred.',
        error: err,
      } as UseCaseError);
      // console.log('[AppError]: An unexpected error occurred');
      // console.error(err);
    }

    public static create(err: string): UnexpectedError {
      return new UnexpectedError(err);
    }
  }
}
