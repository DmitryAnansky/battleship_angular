import { Injectable } from '@angular/core';

@Injectable()
export class GridService {

  constructor() { }

  getGrid(num: number) {
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
