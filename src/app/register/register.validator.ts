import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { RegisterInput } from './register.in';

export interface RegisterValidator extends Validator<RegisterInput> {
  validate(request: RegisterInput): ValidatorResult;
}
