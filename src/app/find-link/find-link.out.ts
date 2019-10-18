import { Output } from '../core/definitions/output';

export interface FindLinkOutput extends Output {
  url?: string;
  error?: boolean;
  msg?: string;
}
