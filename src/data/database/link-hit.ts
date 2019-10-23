import { Model } from '../../app/core/definitions/model';
import { LinkHit } from '../../app/core/entities/link-hit';

export class LinkHitModel implements Model {
  $loki!: number;
  time: number;
  uid: string;

  constructor(hit: Partial<LinkHit>) {
    this.fromEntity(hit);
  }

  toEntity(): LinkHit {
    return {
      id: this.$loki,
      time: new Date(this.time),
      uid: this.uid,
    };
  }

  private fromEntity(hit: Partial<LinkHit>): void {
    if (!hit) {
      return;
    }
    if (hit.id) {
      this.$loki = hit.id;
    }
    if (hit.uid) {
      this.uid = hit.uid;
    }
    if (hit.time) {
      this.time = hit.time.getTime();
    }
  }
}
