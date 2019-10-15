import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { FindUserInput } from '../../app/find-user/find-user.in';
import { FindUserValidator } from '../../app/find-user/find-user.validator';

type Joi = typeof Module;

export class FindUserValidatorImpl implements FindUserValidator {
    private joi: Joi;
    private schema: Module.ObjectSchema;
    
    constructor(joi: Joi) {
        this.joi = joi;
        this.schema = this.joi.object().keys({
            email: this.joi.string().email({ minDomainAtoms: 2 }),
        });
    }

    validate(request: FindUserInput): ValidatorResult {
        const result = this.joi.validate(request, this.schema);
        return { valid: result.error === null, error: result.error };
    }
}