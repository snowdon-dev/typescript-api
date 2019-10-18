import { Interactor } from '../core/definitions/interactor';
import { ApplicationErrorFactory } from '../core/definitions/application-error-factory';
import { ErrorType } from '../core/definitions/error-type';

import { ShortenInput } from './shorten.in';
import { ShortenOutput } from './shorten.out';
import { ShortenRepository } from './shorten.repository';
import { ShortenValidator } from './shorten.validator';

import { LinkEntry } from '../core/entities/link-entry';

import { uidGen } from '../core/utils/rng';

// Length of the unique identifier to generate.
// 4 character identifier is hard coded in the routing
const uidLength = 4;

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

    // create a unique identifer
    let uniqueResult = false;
    let uid;
    while (!uniqueResult) {
      uid = uidGen(uidLength); // 4 ^ 62 avaliable combinations

      // generated uids may not be unique, lets check
      uniqueResult = await this.shortenRepository.ensureUniqueGUID(uid);
    }

    const baseName = process.env.NODE_ENV !== 'production' ? 'localhost:3000/' : false; // @todo implement production using injection for use with configs

    const entry = new LinkEntry(
      Number(request.awinaffid),
      Number(request.awinmid),
      request.endpoint,
      uid,

      // unix time has compatibility with any database implementation
      new Date().getTime(),

      request.platform,
    );

    const id = await this.shortenRepository.storeShortLink(entry);

    if (!id) {
      const msg = 'Service tempararily unavailable';
      throw this.errorFactory.getError(ErrorType.general, msg);
    }

    return {
      url: baseName + uid,
    };
  }
}
