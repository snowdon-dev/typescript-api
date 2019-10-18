import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { RecordHitInput } from './record-hit.in';

export interface RecordHitValidator extends Validator<RecordHitInput> {
  validate(request: RecordHitInput): ValidatorResult;
}
