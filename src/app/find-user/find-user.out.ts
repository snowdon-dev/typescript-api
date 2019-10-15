import { Output } from '../core/definitions/output';
import { User } from '../core/entities/user';

export interface FindUserOutput extends Output {
  user: User;
}
