import { RecordHitRepository } from '../../app/record-hit/record-hit.repository';
import { Database } from '../database';
import { LinkHitModel } from '../database/link-hit';

export class RecordHitRepositoryImpl implements RecordHitRepository {
  constructor(private db: Database) {}

  async recordHit(uid: string): Promise<boolean> {
    const hit = this.db.hits.insert(
      new LinkHitModel({
        uid,
        time: new Date(),
      }),
    );

    return !!hit;
  }
}
