import LokiConstructor from 'lokijs';

import { UserModel } from './user.model';
import { LinkEntryModel } from './link-entry';
import { LinkHitModel } from './link-hit';

const loki = new LokiConstructor('store.db');

const users = loki.addCollection('users');
const links = loki.addCollection('links');
const hits = loki.addCollection('hits');

export interface Database {
  users: Collection<UserModel>;
  links: Collection<LinkEntryModel>;
  hits: Collection<LinkHitModel>;
}

export const db: Database = {
  users,
  links,
  hits,
};
