import {ShipEntity} from '../game/ship';
import {Shape} from '../game/game_constants';

export class Ship implements ShipEntity {
  public name: string;
  public type: Shape;
  public length = 0;

  constructor(...args) {
    Object.assign(this, ...args);
  }
}
