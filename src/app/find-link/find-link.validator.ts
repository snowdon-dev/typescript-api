import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { FindLinkInput } from './find-link.in';

export interface FindLinkValidator extends Validator<FindLinkInput> {
  validate(request: FindLinkInput): ValidatorResult;
}
