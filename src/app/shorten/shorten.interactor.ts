import { Interactor } from '../core/definitions/interactor';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

import { ShortenInput } from './shorten.in';
import { ShortenOutput } from './shorten.out';
import { ShortenRepository } from './shorten.repository';
import { ShortenValidator } from './shorten.validator';

import { LinkEntry } from '../core/entities/link-entry';


// Length of the unique identifier to generate.
// 4 character identifier is hard coded in the routing
// 4 ^ 62 avaliable combinations
const uidLength = 4;

export class ShortenInteractor implements Interactor {
  constructor(
    private shortenValidator: ShortenValidator,
    private shortenRepository: ShortenRepository,
    private errorFactory: ApplicationErrorFactory,
    private baseName: string,
    private linkUidGenerator: (strLength: number) => string,
  ) {}

  async execute(request: ShortenInput): Promise<ShortenOutput> {
    const result = this.shortenValidator.validate(request);
    if (!result.valid) {
      throw this.errorFactory.getError(ErrorType.validation, result.error);
    }

    // create a unique identifer
    let uniqueResult = false;
    let uid;
    while (!uniqueResult) {
      uid = this.linkUidGenerator(uidLength);

      // generated uids may not be unique, lets check
      uniqueResult = await this.shortenRepository.ensureUniqueGUID(uid);
    }

    const entry = new LinkEntry(
      Number(request.awinaffid),
      Number(request.awinmid),
      request.endpoint,
      uid,
      new Date(),
      request.platform,
    );

    const id = await this.shortenRepository.storeShortLink(entry);

    if (!id) {
      const msg = 'Service tempararily unavailable';
      throw this.errorFactory.getError(ErrorType.general, msg);
    }

    return {
      url: this.baseName + uid,
    };
  }
}
