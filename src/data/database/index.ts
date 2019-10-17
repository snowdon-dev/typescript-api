import LokiConstructor from 'lokijs';

import { UserModel } from './user.model';
import { LinkEntryModel } from './link-entry';

const loki = new LokiConstructor('store.db');

const users = loki.addCollection('users');
const links = loki.addCollection('links');

export interface Database {
  users: Collection<UserModel>;
  links: Collection<LinkEntryModel>;
}

export const db: Database = {
  users,
  links,
};
