import * as Module from 'joi';
import { ValidatorResult } from '../../app/core/definitions/validator-result';

import { RecordHitInput } from '../../app/record-hit/record-hit.in';
import { RecordHitValidator } from '../../app/record-hit/record-hit.validator';

type Joi = typeof Module;

export class RecordHitValidatorImpl implements RecordHitValidator {
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

  validate(request: RecordHitInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
