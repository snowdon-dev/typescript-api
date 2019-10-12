import LokiConstructor from 'lokijs';

import { UserModel } from './user.model';

const loki = new LokiConstructor('store.db');

const users = loki.addCollection('users');

export interface Database {
  users: Collection<UserModel>;
}

export const db: Database = {
  users,
};
