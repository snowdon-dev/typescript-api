import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';

import { ShortenInput } from '../../app/shorten/shorten.in';
import { ShortenValidator } from '../../app/shorten/shorten.validator';

type Joi = typeof Module;

export class ShortenValidatorImpl implements ShortenValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      awinaffid: this.joi
        .string()
        .regex(/^[0-9]*/)
        .required(),
      awinmid: this.joi
        .string()
        .regex(/^[0-9]*/)
        .required(),
      endpoint: this.joi.string().required(),
      platform: this.joi.string(),
    });
  }

  validate(request: ShortenInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
