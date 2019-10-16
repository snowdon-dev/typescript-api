import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { ShortenInput } from './shorten.in';

export interface ShortenValidator extends Validator<ShortenInput> {
  validate(request: ShortenInput): ValidatorResult;
}
