import { Entity } from './entity';

export class LinkHit implements Entity {
  constructor(public uid: string, public time: number, public id?: number) {}
}
