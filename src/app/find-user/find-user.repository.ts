import { User } from '../core/entities/user';

export interface FindUserRepository {
    findUserByEmail(email: string): Promise<User | null>;
}
