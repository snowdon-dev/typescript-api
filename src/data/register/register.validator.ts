import * as Module from 'joi';

import { ValidatorResult } from '../../app/core/definitions/validator-result';
import { RegisterInput } from '../../app/register/register.in';
import { RegisterValidator } from '../../app/register/register.validator';

type Joi = typeof Module;

export class RegisterValidatorImpl implements RegisterValidator {
  private joi: Joi;
  private schema: Module.ObjectSchema;

  constructor(joi: Joi) {
    this.joi = joi;
    this.schema = this.joi.object().keys({
      firstname: this.joi
        .string()
        .regex(/^[a-zA-Z][a-zA-Z0-9\s]{2,30}$/)
        .required(),
      lastname: this.joi
        .string()
        .regex(/^[a-zA-Z][a-zA-Z\s]{2,30}$/)
        .required(),
      email: this.joi.string().email({ minDomainAtoms: 2 }),
      username: this.joi
        .string()
        .regex(/^[a-zA-Z0-9]{2,30}$/)
        .required(),
      password: this.joi.string().regex(/^[a-zA-Z0-9\s]{3,30}$/),
    });
  }

  validate(request: RegisterInput): ValidatorResult {
    const joiResult = this.joi.validate(request, this.schema);
    return { valid: joiResult.error === null, error: joiResult.error };
  }
}
