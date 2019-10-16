import { ID } from '../core/definitions/id';
import { LinkEntry } from '../core/entities/link-entry';

export interface ShortenRepository {
  storeShortLink(link: LinkEntry): Promise<ID | null>;
  ensureUniqueGUID(guid: string): Promise<boolean>;
}
