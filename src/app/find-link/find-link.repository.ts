import { LinkEntry } from '../core/entities/link-entry';

export interface FindLinkRepository {
  findLinkByUid(uid: string): Promise<LinkEntry | null>;
}
