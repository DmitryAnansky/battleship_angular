import {Injectable} from '@angular/core';

const shipOrientation = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
const lShaped = 'lShape';

@Injectable()
export class ShipService {

  constructor() {
  }

  calculateLShipTop(cellId: number) {
    const inc = 10;

    return [cellId, cellId - inc, cellId - 2 * inc, cellId - (2 * inc - 1)];
  }

  calculateLShipBottom(cellId: number) {
    const inc = 10;

    return [cellId, cellId + inc, cellId + 2 * inc, cellId + (2 * inc + 1)];
  }

  calculateLShipRight(cellId: number) {
    const inc = 10;

    return [cellId, cellId + inc, cellId + (inc - 1), cellId + (inc - 2)];
  }

  calculateLShipLeft(cellId: number) {
    const inc = 10;

    return [cellId, cellId - inc, cellId - (inc - 1), cellId - (inc - 2)];
  }

  calculateIShipBorderPoints(location: number, cellId: number, ship: any, orientation: string) {
    const inc = 10;

    switch (orientation) {
      case shipOrientation.TOP: {
        let iShapedTopBorder = [];

        // add right side
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

        // add left side
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
      case shipOrientation.LEFT: {
        return [];
      }
      case shipOrientation.RIGHT: {
        return [];
      }
      case shipOrientation.BOTTOM: {
        let iShapedBottomBorder = [];

        // add right side
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

        // add left side
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

  calculateLShipBorderPoints(location, cellId, inc, ship, orientation) {
    switch (orientation) {
      case shipOrientation.TOP: {

        break;
      }
      case shipOrientation.LEFT: {

        break;
      }
      case shipOrientation.RIGHT: {

        break;
      }
      case shipOrientation.BOTTOM: {

        break;
      }
      default: {

        break;
      }
    }

    return [];
  }

  calculateDotShipBorderPoints(location: number, cellId: number, inc) {
    let dotShapedShipBorder = [];

    // add right side
    if (location % 10 !== 0) {
      dotShapedShipBorder = [...dotShapedShipBorder, ...[(cellId + 1) - inc, cellId + 1, (cellId + 1) + inc]];
    }

    // add left side
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

  calculateBorderPoints(location: number, ship: any, orientation: string) {
    const inc = 10;
    const cellId = location - 1;

    if (ship.type === lShaped) {
      return this.calculateLShipBorderPoints(location, cellId, inc, ship, orientation);
    }

    if (ship.length === 1) {
      return this.calculateDotShipBorderPoints(location, cellId, inc);
    }

    return this.calculateIShipBorderPoints(location, cellId, ship, orientation);
  }
}
