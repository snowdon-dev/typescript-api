import { ID } from '../definitions/id';
import { Entity } from './entity';

export class LinkEntry implements Entity {
  constructor(
    public awinaffid: number,
    public awinmid: number,
    public endpoint: string,
    public guid: string,
    public unixTime: string,
    public platform?: string,
    public id?: ID,
  ) {}
}