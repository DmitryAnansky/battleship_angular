import {ShipEntity} from '../game/ship';

export class Ship implements ShipEntity{
  public name: string;
  public type: string;
  public length: number = 0;

  constructor(...args) {
    Object.assign(this, ...args);
  }
}
