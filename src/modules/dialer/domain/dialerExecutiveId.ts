import { ValueObject } from '../../../shared/domain/ValueObject';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

interface ExecutiveIdProps {
  value: string;
}

export class ExecutiveID extends ValueObject<ExecutiveIdProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: ExecutiveIdProps) {
    super(props);
  }

  public static create(props: ExecutiveIdProps): Result<ExecutiveID> {
    const nullGuardResult = Guard.againstNullOrUndefined(props.value, 'executiveID');

    if (!nullGuardResult.succeeded) {
      return Result.fail<ExecutiveID>(nullGuardResult.message as string);
    }

    return Result.ok<ExecutiveID>(new ExecutiveID(props));
  }
}
