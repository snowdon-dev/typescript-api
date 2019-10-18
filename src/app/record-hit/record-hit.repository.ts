export interface RecordHitRepository {
  recordHit(uid: string): Promise<boolean>;
}
