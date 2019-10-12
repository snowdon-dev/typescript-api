import { ID } from '../core/definitions/id';
import { User } from '../core/entities/user';

export interface RegisterRepository {
  findUserByUsername(username: string): Promise<User | null>;
  createUser(user: User): Promise<ID>;
}
