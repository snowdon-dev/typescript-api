import { ID } from '../../app/core/definitions/id';
import { User } from '../../app/core/entities/user';
import { RegisterRepository } from '../../app/register/register.repository';

import { Database } from '../database';
import { UserModel } from '../database/user.model';

export class RegisterRepositoryImpl implements RegisterRepository {
  constructor(private db: Database) {}

  async findUserByUsername(username: string): Promise<User | null> {
    const user = this.db.users.findOne({ username });

    if (user) {
      return user.toEntity();
    }

    return null;
  }

  async createUser(user: User): Promise<ID> {
    const result = this.db.users.insert(new UserModel(user));
    if (result) {
      return result.$loki;
    }

    throw new Error('Database Error');
  }
}
