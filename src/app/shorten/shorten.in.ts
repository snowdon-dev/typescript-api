import { Input } from '../core/definitions/input';

export interface ShortenInput extends Input {
  awinaffid: string;
  awinmid: string;
  platform?: string;
  endpoint: string;
}
