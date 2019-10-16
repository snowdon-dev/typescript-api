import { Interactor } from '../core/definitions/interactor';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

import { ShortenInput } from './shorten.in';
import { ShortenOutput } from './shorten.out';
import { ShortenRepository } from './shorten.repository';
import { ShortenValidator } from './shorten.validator';

export class ShortenInteractor implements Interactor {
  constructor(
    private shortenValidator: ShortenValidator,
    private shortenRepository: ShortenRepository,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: ShortenInput): Promise<ShortenOutput> {
    const result = this.shortenValidator.validate(request);

    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    return {
      url: 'example.com',
    };
  }
}
