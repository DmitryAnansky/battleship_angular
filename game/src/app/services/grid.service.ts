import { Injectable } from '@angular/core';
import {Grid} from '../game/grid';

@Injectable()
export class GridService {

  constructor() { }

  getGrid(num: number): Grid[] {
    return Array.from(Array(num).keys()).map((id) => {
      return {
        id: id,
        isShip: false,
        isHit: false,
        isMiss: false,
        isHovered: false,
        isBorder: false
      };
    });
  }
}
