import { Interactor } from '../core/definitions/interactor';
import { User } from '../core/entities/user';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';

import { RegisterInput } from './register.in';
import { RegisterOutput } from './register.out';
import { RegisterRepository } from './register.repository';
import { RegisterValidator } from './register.validator';
import { ErrorType } from '../core/definitions/error-type';

export class RegisterInteractor implements Interactor {
  constructor(
    private registerValidator: RegisterValidator,
    private registerRepository: RegisterRepository,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: RegisterInput): Promise<RegisterOutput> {
    const result = this.registerValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const user = await this.registerRepository.findUserByUsername(request.username);

    if (user) {
      throw this.errorFactory.getError(ErrorType.userExists, { username: request.username });
    }

    try {
      const user: User = { ...request, balance: 0 };
      const id = await this.registerRepository.createUser(user);
      const output: RegisterOutput = {
        user: {
          id,
          firstname: request.firstname,
          lastname: request.lastname,
          username: request.username,
          email: request.email,
        },
      };

      return Promise.resolve(output);
    } catch (error) {
      throw this.errorFactory.getError(ErrorType.userCreate, error);
    }
  }
}
