import { ID } from '../definitions/id';
import { Entity } from './entity';

export class User implements Entity {
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public username: string,
    public password: string,
    public balance = 0,
    public id?: ID,
  ) {}
}