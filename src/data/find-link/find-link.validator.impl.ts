import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { FindLinkInput } from '../../app/find-link/find-link.in';
import { FindLinkValidator } from '../../app/find-link/find-link.validator';

type Joi = typeof Module;

export class FindLinkValidatorImpl implements FindLinkValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      uid: this.joi
        .string()
        .regex(/^[a-zA-Z0-9]{4}$/)
        .required(),
    });
  }

  validate(request: FindLinkInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
