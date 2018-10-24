import {Injectable} from '@angular/core';
import {Orientation, Shape} from '../game/game_constants';
import {Grid} from '../game/grid';
import {Ship} from '../models/ship.model';
import {intersection} from 'lodash';

@Injectable()
export class ShipService {

  constructor() {
  }

  calculateLShipTop(cellId: number): number[] {
    const inc = 10;

    return [cellId, cellId - inc, cellId - 2 * inc, cellId - (2 * inc - 1)];
  }

  calculateLShipBottom(cellId: number): number[] {
    const inc = 10;

    return [cellId, cellId + inc, cellId + 2 * inc, cellId + (2 * inc + 1)];
  }

  calculateLShipRight(cellId: number): number[] {
    const inc = 10;

    return [cellId, cellId + inc, cellId + (inc - 1), cellId + (inc - 2)];
  }

  calculateLShipLeft(cellId: number): number[] {
    const inc = 10;

    return [cellId, cellId - inc, cellId - (inc - 1), cellId - (inc - 2)];
  }

  calculateIShipBorderPoints(location: number, ship: Ship, orientation: Orientation): number[] {
    const inc = 10;
    const cellId = location - 1;

    switch (orientation) {
      case Orientation.TOP: {
        let iShapedTopBorder = [];

        // add right side border
        if (location % 10 !== 0) {
          iShapedTopBorder = [
            ...iShapedTopBorder,
            ...[
              (cellId + 1) + inc,
              cellId + 1,
              (cellId + 1) - inc,
              (cellId + 1) - 2 * inc,
              (cellId + 1) - 3 * inc,
              (cellId + 1) - 4 * inc
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          iShapedTopBorder = [
            ...iShapedTopBorder,
            ...[
              (cellId - 1) + inc,
              cellId - 1,
              (cellId - 1) - inc,
              (cellId - 1) - 2 * inc,
              (cellId - 1) - 3 * inc,
              (cellId - 1) - 4 * inc
            ]
          ];
        }

        return [
          ...iShapedTopBorder,
          ... [
            cellId + inc,
            cellId - inc * 4
          ]
        ];
      }
      case Orientation.LEFT: {
        let iShapedLeftBorder = [];

        // add right side border
        if (location % 10 !== 0) {
          iShapedLeftBorder = [
            ...iShapedLeftBorder,
            ...[
              cellId - inc + 1,
              cellId + 1,
              cellId + inc + 1,
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 4) {
          iShapedLeftBorder = [
            ...iShapedLeftBorder,
            ...[
              cellId + inc - 4,
              cellId - 4,
              cellId - inc - 4,
            ]
          ];
        }

        return [
          ...iShapedLeftBorder,
          ... [
            cellId + inc,
            cellId + inc - 1,
            cellId + inc - 2,
            cellId + inc - 3,
            cellId - inc,
            cellId - inc - 1,
            cellId - inc - 2,
            cellId - inc - 3
          ]
        ];
      }
      case Orientation.RIGHT: {
        let iShapedRightBorder = [];

        // add right side border
        if (location % 10 < 7) {
          iShapedRightBorder = [
            ...iShapedRightBorder,
            ...[
              cellId + inc + 4,
              cellId + 4,
              cellId - inc + 4,
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          iShapedRightBorder = [
            ...iShapedRightBorder,
            ...[
              cellId - inc - 1,
              cellId - 1,
              cellId + inc - 1,
            ]
          ];
        }

        return [
          ...iShapedRightBorder,
          ... [
            cellId + inc,
            cellId + inc + 1,
            cellId + inc + 2,
            cellId + inc + 3,
            cellId - inc,
            cellId - inc + 1,
            cellId - inc + 2,
            cellId - inc + 3
          ]
        ];
      }
      case Orientation.BOTTOM: {
        let iShapedBottomBorder = [];

        // add right side border
        if (location % 10 !== 0) {
          iShapedBottomBorder = [
            ...iShapedBottomBorder,
            ...[
              (cellId + 1) - inc,
              cellId + 1,
              (cellId + 1) + inc,
              (cellId + 1) + 2 * inc,
              (cellId + 1) + 3 * inc,
              (cellId + 1) + 4 * inc
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          iShapedBottomBorder = [
            ...iShapedBottomBorder,
            ...[
              (cellId - 1) - inc,
              cellId - 1,
              (cellId - 1) + inc,
              (cellId - 1) + 2 * inc,
              (cellId - 1) + 3 * inc,
              (cellId - 1) + 4 * inc
            ]
          ];
        }

        return [
          ...iShapedBottomBorder,
          ... [
            cellId - inc,
            cellId + inc * 4
          ]
        ];
      }
      default: {
        return [];
      }
    }
  }

  calculateLShipBorderPoints(location: number, ship: Ship, orientation: Orientation): number[] {
    const inc = 10;
    const cellId = location - 1;

    switch (orientation) {
      case Orientation.TOP: {
        let lShapedTopBorder = [];

        // add right side border
        if (location % 10 !== 9) {
          lShapedTopBorder = [
            ...lShapedTopBorder,
            ...[
              cellId - inc + 2,
              cellId - 2 * inc + 2,
              cellId - 3 * inc + 2
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          lShapedTopBorder = [
            ...lShapedTopBorder,
            ...[
              cellId + inc - 1,
              cellId - 1,
              cellId - inc - 1,
              cellId - 2 * inc - 1,
              cellId - 3 * inc - 1,
            ]
          ];
        }

        return [
          ...lShapedTopBorder,
          ... [
            cellId - inc * 3,
            cellId - inc * 3 + 1,
            cellId + inc,
            cellId + inc + 1,
            cellId + 1,
            cellId - inc + 1
          ]
        ];
      }
      case Orientation.LEFT: {
        let lShapedLeftBorder = [];

        // add right side border
        if (location % 10 !== 8) {
          lShapedLeftBorder = [
            ...lShapedLeftBorder,
            ...[
              cellId - inc + 3,
              cellId - 2 * inc + 3,
              cellId + 3,
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          lShapedLeftBorder = [
            ...lShapedLeftBorder,
            ...[
              cellId - 1,
              cellId + inc - 1,
              cellId - inc - 1,
              cellId - 2 * inc - 1,
            ]
          ];
        }

        return [
          ...lShapedLeftBorder,
          ... [
            cellId + inc,
            cellId + inc + 1,
            cellId + 1,
            cellId + 2,
            cellId - 2 * inc,
            cellId - 2 * inc + 1,
            cellId - 2 * inc + 2
          ]
        ];
      }
      case Orientation.RIGHT: {
        let lShapedRightBorder = [];

        // add right side border
        if (location % 10 !== 0) {
          lShapedRightBorder = [
            ...lShapedRightBorder,
            ...[
              cellId + 1,
              cellId - inc + 1,
              cellId + inc + 1,
              cellId + 2 * inc + 1
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 3) {
          lShapedRightBorder = [
            ...lShapedRightBorder,
            ...[
              cellId + inc - 3,
              cellId + 2 * inc - 3,
              cellId - 3
            ]
          ];
        }

        return [
          ...lShapedRightBorder,
          ... [
            cellId - inc,
            cellId - inc - 1,
            cellId - 1,
            cellId - 2,
            cellId + 2 * inc,
            cellId + 2 * inc - 1,
            cellId + 2 * inc - 2
          ]
        ];
      }
      case Orientation.BOTTOM: {
        let lShapedBottomBorder = [];

        // add right side border
        if (location % 10 !== 9) {
          lShapedBottomBorder = [
            ...lShapedBottomBorder,
            ...[
              cellId + inc + 2,
              cellId + inc * 2 + 2,
              cellId + inc * 3 + 2
            ]
          ];
        }

        // add left side border
        if (location % 10 !== 1) {
          lShapedBottomBorder = [
            ...lShapedBottomBorder,
            ...[
              cellId + inc * 3 - 1,
              cellId + inc * 2 - 1,
              cellId + inc - 1,
              cellId - 1,
              cellId - inc - 1,
            ]
          ];
        }

        return [
          ...lShapedBottomBorder,
          ... [
            cellId - inc,
            cellId + inc * 3,
            cellId + inc * 3 + 1,
            cellId + inc + 1,
            cellId + 1,
            cellId - inc + 1,
          ]
        ];
      }
      default: {
        return [];
      }
    }
  }

  calculateDotShipBorderPoints(location: number): number[] {
    const inc = 10;
    const cellId = location - 1;

    let dotShapedShipBorder = [];

    // add right side border
    if (location % 10 !== 0) {
      dotShapedShipBorder = [...dotShapedShipBorder, ...[(cellId + 1) - inc, cellId + 1, (cellId + 1) + inc]];
    }

    // add left side border
    if (location % 10 !== 1) {
      dotShapedShipBorder = [...dotShapedShipBorder, ...[(cellId - 1) - inc, cellId - 1, (cellId - 1) + inc]];
    }

    return [
      ...dotShapedShipBorder,
      ... [
        cellId - inc,
        cellId + inc
      ]
    ];
  }

  calculateBorderPoints(location: number, ship: Ship, orientation: Orientation): number[] {
    if (ship.type === Shape.L_SHAPED) {
      return this.calculateLShipBorderPoints(location, ship, orientation);
    }

    if (ship.length === 1) {
      return this.calculateDotShipBorderPoints(location);
    }

    return this.calculateIShipBorderPoints(location, ship, orientation);
  }

  shipsAlive(grid: Grid[]): boolean {
    const fleetAliveShipPoints = grid.filter(point => point.isShip && !point.isHit);

    return fleetAliveShipPoints.length > 0;
  }

  checkOverlap(location: number, ship: Ship, orientation: Orientation, grid: Grid[]): boolean {
    const borderPoints = [...this.calculateBorderPoints(location, ship, orientation), ...[location - 1]];
    const shipsPoints = grid.filter(element => element.isShip === true).map(shipCell => shipCell.id);

    if (!shipsPoints) {
      return false;
    }

    const shipsBorderPositionIntersection = intersection(borderPoints, shipsPoints);

    return shipsBorderPositionIntersection.length > 0;
  }
}
