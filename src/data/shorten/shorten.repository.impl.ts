import { LinkEntry } from '../../app/core/entities/link-entry';
import { ShortenRepository } from '../../app/shorten/shorten.repository';
import { LinkEntryModel } from '../database/link-entry';

import { Database } from '../database';

export class ShortenRepositoryImpl implements ShortenRepository {
  constructor(private db: Database) {}

  async storeShortLink(link: LinkEntry): Promise<number> {
    const result = this.db.links.insert(new LinkEntryModel(link));

    if (result) {
      return result.toEntity().id;
    }
  }

  async ensureUniqueGUID(guid: string): Promise<boolean> {
    const entry = this.db.links.findOne({ guid });
    return !entry || !entry.$loki;
  }
}
