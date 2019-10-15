import { User } from '../../app/core/entities/user';
import { Database } from '../database';
import { FindUserRepository } from '../../app/find-user/find-user.repository';

export class FindUserRepositoryImpl implements FindUserRepository {
  constructor(private db: Database) {}

  async findUserByEmail(username: string): Promise<User | null> {
    const user = this.db.users.findOne({ email: username });

    if (user) {
      return user.toEntity();
    }

    return null;
  }
}
