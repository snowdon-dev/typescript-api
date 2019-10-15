import { Interactor } from '../core/definitions/interactor';

import { FindUserInput } from './find-user.in';
import { FindUserOutput } from './find-user.out';
import { FindUserRepository } from './find-user.repository';
import { FindUserValidator } from './find-user.validator';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

export class FindUserInteractor implements Interactor {
  constructor(
    private findUserValidator: FindUserValidator,
    private findUserRepository: FindUserRepository,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: FindUserInput): Promise<FindUserOutput> {
    const result = this.findUserValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const userResult = await this.findUserRepository.findUserByEmail(request.email);

    if (userResult) {
      return {
        user: {
          id: userResult.id,
          firstname: userResult.firstname,
          lastname: userResult.email,
          email: userResult.email,
          username: userResult.email,
          password: userResult.password,
        },
      };
    } else {
      return null;
    }
  }
}
