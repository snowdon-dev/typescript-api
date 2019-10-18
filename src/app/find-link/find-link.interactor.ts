import { Interactor } from '../core/definitions/interactor';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

import { FindLinkInput } from './find-link.in';
import { FindLinkOutput } from './find-link.out';
import { FindLinkRepository } from './find-link.repository';
import { FindLinkValidator } from './find-link.validator';

export class FindLinkInteractor implements Interactor {
  constructor(
    private findLinkRepository: FindLinkRepository,
    private findLinkValidator: FindLinkValidator,
    private errorFactory: ApplicationErrorFactory,
  ) {}

  async execute(request: FindLinkInput): Promise<FindLinkOutput> {
    const result = this.findLinkValidator.validate(request);

    if (!result.valid) {
      this.errorFactory.getError(ErrorType.validation, result.error);
    }

    const entry = await this.findLinkRepository.findLinkByUid(request.uid);

    if (!entry) {
      const msg = 'Service temporarily unavailable';
      return { error: true, msg };
    }

    const url = entry.endpoint;

    return { url };
  }
}
