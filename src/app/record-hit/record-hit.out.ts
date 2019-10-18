import { Output } from '../core/definitions/output';

export interface RecordHitOutput extends Output {
  error: boolean;
  msg?: string;
}
