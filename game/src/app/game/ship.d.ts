import {Shape} from './game_constants';

export interface ShipEntity {
  name: string;
  type: Shape;
  length: number;
}

export interface ShipOrientation {
  TOP: string,
  BOTTOM: string,
  LEFT: string,
  RIGHT: string
}
