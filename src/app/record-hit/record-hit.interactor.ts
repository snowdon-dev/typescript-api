import { Interactor } from '../core/definitions/interactor';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

import { RecordHitInput } from './record-hit.in';
import { RecordHitOutput } from './record-hit.out';
import { RecordHitRepository } from './record-hit.repository';
import { RecordHitValidator } from './record-hit.validator';

export class RecordHitInteractor implements Interactor {
  constructor(
    private recordHitRepository: RecordHitRepository,
    private recordHitValidator: RecordHitValidator,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: RecordHitInput): Promise<RecordHitOutput> {
    const result = this.recordHitValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const store = this.recordHitRepository.recordHit(request.uid);

    return {
      error: !store,
      msg: !store ? 'Unexpected error' : undefined,
    };
  }
}
