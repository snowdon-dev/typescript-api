import { Validator } from '../core/definitions/validator';
import { ValidatorResult } from '../core/definitions/validator-result';

import { FindUserInput } from './find-user.in';

export interface FindUserValidator extends Validator<FindUserInput> {
    validate(request: FindUserInput): ValidatorResult;
}
