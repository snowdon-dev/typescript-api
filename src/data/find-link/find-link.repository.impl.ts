import { LinkEntry } from '../../app/core/entities/link-entry';
import { Database } from '../database';
import { FindLinkRepository } from '../../app/find-link/find-link.repository';

export class FindLinkRepositoryImpl implements FindLinkRepository {
  constructor(private db: Database) {}

  async findLinkByUid(uid: string): Promise<LinkEntry | null> {
    const entry = this.db.links.findOne({ guid: uid });

    if (entry) {
      return entry.toEntity();
    }

    return null;
  }
}
