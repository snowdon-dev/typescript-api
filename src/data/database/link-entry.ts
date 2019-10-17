import { ID } from '../../app/core/definitions/id';
import { Model } from '../../app/core/definitions/model';
import { LinkEntry } from '../../app/core/entities/link-entry';

export class LinkEntryModel implements Model {
  $loki!: ID;
  awinaffid: number;
  awinmid: number;
  endpoint: string;
  guid: string;
  unixTime: string;
  platform?: string;

  constructor(linkEntry?: Partial<LinkEntry>) {
    this.fromEntity(linkEntry);
  }

  toEntity(): LinkEntry {
    return {
      id: this.$loki,
      awinaffid: this.awinaffid,
      awinmid: this.awinmid,
      endpoint: this.endpoint,
      guid: this.guid,
      unixTime: this.unixTime,
      platform: this.platform,
    };
  }

  private fromEntity(linkEntry?: Partial<LinkEntry>): void {
    if (!linkEntry) {
      return;
    }

    if (linkEntry.id) {
      this.$loki = linkEntry.id;
    }

    if (linkEntry.awinaffid) {
      this.awinaffid = linkEntry.awinaffid;
    }

    if (linkEntry.awinmid) {
      this.awinmid = linkEntry.awinmid;
    }

    if (linkEntry.endpoint) {
      this.endpoint = linkEntry.endpoint;
    }

    if (linkEntry.guid) {
      this.guid = linkEntry.guid;
    }

    if (linkEntry.unixTime) {
      this.unixTime = linkEntry.unixTime;
    }

    if (linkEntry.platform) {
      this.platform = linkEntry.platform;
    }
  }
}
