import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ShipService} from '../../services/ship.service';
import {Ship} from '../../models/ship.model';
import {Fleet} from '../../models/fleet.model';
import {Orientation, Shape} from '../../game/game_constants';
import {Grid} from '../grid';

@Component({
  selector: 'app-player-grid',
  templateUrl: './player-grid.component.html',
  styleUrls: ['./player-grid.component.scss']
})

export class PlayerGridComponent {
  @Input() titleTopNumbers;
  @Input() titleLeftAlphabet;
  @Input() orientation;

  @Input() playerGrid;
  @Output() playerGridChange: EventEmitter<Grid[]> = new EventEmitter();

  @Input() shipPlacementPhase;
  @Output() shipPlacementPhaseChange: EventEmitter<boolean> = new EventEmitter();

  @Input() selectedShip;
  @Output() selectedShipChange: EventEmitter<Ship> = new EventEmitter();

  @Input() selectedFleet;
  @Output() selectedFleetChange: EventEmitter<Fleet> = new EventEmitter();

  @Input() displayRotationControl;
  @Output() displayRotationControlChange: EventEmitter<boolean> = new EventEmitter();

  @Input() gamePhase;
  @Output() gamePhaseChange: EventEmitter<boolean> = new EventEmitter();

  @Input() consoleText;
  @Output() consoleTextChange: EventEmitter<string> = new EventEmitter();

  constructor(private shipService: ShipService) {
  }

  /**
   * @param {MouseEvent} e
   */
  onPointClick(e): void {
    const activePointId = parseInt(e.currentTarget.id, 10);

    if (this.shipPlacementPhase) {
      this.setShip(activePointId, this.selectedShip, this.orientation, this.selectedFleet);
    }
  }

  /**
   * @param {MouseEvent} e
   */
  onMouseExitPoint(e): void {
    if (!this.shipPlacementPhase) {
      return;
    }

    const pointLocation = parseInt(e.target.id, 10);

    this.removeShip();
    this.removeShipBorder(pointLocation, this.selectedShip);
  }

  /**
   * @param {MouseEvent} e
   */
  onMouseEnterPoint(e): void {
    if (!this.shipPlacementPhase) {
      return;
    }

    const mousePosition = parseInt(e.target.id, 10);

    if (!this.selectedFleet.ships[this.selectedFleet.currentShip]) {
      return;
    }

    switch (this.orientation) {
      case Orientation.TOP: {
        this.displayShipTop(mousePosition, this.selectedShip);
        break;
      }
      case Orientation.LEFT: {
        this.displayShipLeft(mousePosition, this.selectedShip);
        break;
      }
      case Orientation.RIGHT: {
        this.displayShipRight(mousePosition, this.selectedShip);
        break;
      }
      case Orientation.BOTTOM: {
        this.displayShipBottom(mousePosition, this.selectedShip);
        break;
      }
      default: {
        this.displayShipBottom(mousePosition, this.selectedShip);
        break;
      }
    }
  }

  displayShipTop(location: number, ship: Ship): void {
    const cellId = location - 1;

    let inc = 0;

    if (ship.type === Shape.L_SHAPED) {
      const endPoint = ((ship.length + 1) * 10) - 10;

      if (ship.length === 1 || (location + endPoint > 60 && location % 10 !== 0)) {
        const shipPoints = this.shipService.calculateLShipTop(cellId);

        this.displayShip(shipPoints);
        this.displayShipBorder(location, ship);
      }
    } else {
      const endPoint = (ship.length * 10) - 10;

      if (ship.length === 1 || location + endPoint > 60) {
        for (let i = location; i < (location + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === (cellId - inc));

          if (point) {
            point.isHovered = true;
          }

          inc = inc + 10;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipBottom(location: number, ship: Ship): void {
    const cellId = location - 1;

    let inc = 0;

    if (ship.type === Shape.L_SHAPED) {
      const endPoint = ((ship.length - 1) * 10) - 10;

      if (location + endPoint <= 100 && location % 10 !== 0) {
        const shipPoints = this.shipService.calculateLShipBottom(cellId);

        this.displayShip(shipPoints);
        this.displayShipBorder(location, ship);
      }

    } else {
      const endPoint = (ship.length * 10) - 10;

      if (location + endPoint <= 100) {
        for (let i = location; i < (location + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === (cellId + inc));

          if (point) {
            point.isHovered = true;
          }

          inc = inc + 10;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipLeft(location: number, ship: Ship): void {
    const cellId = location - 1;

    if (ship.type === Shape.L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipLeft(cellId);
      const endPoint = 10;

      if (location > endPoint && location % 10 < 9 && location % 10 !== 0) {
        this.displayShip(shipPoints);
        this.displayShipBorder(location, ship);
      }
    } else {
      if (ship.length === 1 || location % 10 >= 4 || location % 10 === 0) {
        for (let i = cellId; i > (cellId - ship.length); i--) {
          const point = this.playerGrid.find(element => element.id === i);
          point.isHovered = true;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipRight(location: number, ship: Ship): void {
    const cellId = location - 1;

    if (this.selectedShip.type === Shape.L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipRight(cellId);
      const endPoint = 90;

      if (location <= endPoint && (location % 10 === 0 || location % 10 > 2)) {
        this.displayShip(shipPoints);
        this.displayShipBorder(location, ship);
      }
    } else {
      const endPoint = location + ship.length - 2;

      if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
        for (let i = cellId; i < (cellId + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === i);
          point.isHovered = true;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  removeShip(): void {
    this.playerGrid
      .filter(element => element.isHovered === true)
      .map(element => element.id)
      .map(id => {
        const point = this.playerGrid.find(element => element.id === id);

        if (point) {
          point.isHovered = false;
        }
      });
  }

  displayShip(shipPoints: number[]): void {
    shipPoints.map(id => {
      const point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isHovered = true;
      }
    });
  }

  displayShipBorder(location: number, ship: Ship): void {
    const borderPoints = this.shipService.calculateBorderPoints(location, ship, this.orientation);

    borderPoints.map(id => {
      const point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isBorder = true;
      }
    });
  }

  removeShipBorder(location: number, ship: Ship): void {
    const borderPoints = this.shipService.calculateBorderPoints(location, ship, this.orientation);

    borderPoints.map(id => {
      const point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isBorder = false;
      }
    });
  }

  setLShip(shipPoints: number[]): void {
    shipPoints.map(id => {
      const point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isShip = true;
      }
    });
  }

  setShip(location: number, ship: Ship, orientation: Orientation, genericFleet: Fleet): void {
    if (this.shipService.checkOverlap(location, ship, orientation, this.playerGrid)) {
      this.consoleText = `${this.selectedShip.type} can not be placed on this position`;
      this.consoleTextChange.emit(this.consoleText);
      return;
    }

    switch (this.orientation) {
      case Orientation.TOP: {
        this.setShipTop(location, ship, orientation, genericFleet);
        break;
      }
      case Orientation.LEFT: {
        this.setShipLeft(location, ship, orientation, genericFleet);
        break;
      }
      case Orientation.RIGHT: {
        this.setShipRight(location, ship, orientation, genericFleet);
        break;
      }
      case Orientation.BOTTOM: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
      default: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
    }

    this.consoleText = `${this.selectedShip.type} has been placed
        [${genericFleet.currentShip}/${genericFleet.shipDetails.length}]`;

    this.consoleTextChange.emit(this.consoleText);
    this.playerGridChange.emit(this.playerGrid);

    if (!genericFleet.ships[genericFleet.currentShip]) {
      this.shipPlacementPhase = false;
      this.displayRotationControl = false;
      this.gamePhase = true;

      this.shipPlacementPhaseChange.emit(this.shipPlacementPhase);
      this.gamePhaseChange.emit(this.gamePhase);
      this.displayRotationControlChange.emit(this.displayRotationControl);

      this.consoleText = 'Player can select sector to attack bots Fleet.';
      this.consoleTextChange.emit(this.consoleText);
    }
  }

  setShipTop(location: number, ship: Ship, orientation: Orientation, genericFleet: Fleet): void {
    const cellId = location - 1;

    if (ship.type === Shape.L_SHAPED) {
      const endPoint = ((ship.length + 1) * 10) - 10;

      if (ship.length === 1 || (location + endPoint > 60 && location % 10 !== 0)) {
        const shipPoints = this.shipService.calculateLShipTop(cellId);

        this.setLShip(shipPoints);
        this.displayNextFleetShip(location, ship, genericFleet);
      }
    } else {
      const endPoint = (ship.length * 10) - 10;

      let inc = 0;

      if (ship.length === 1 || location + endPoint > 60) {
        for (let i = location; i < (location + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === cellId - inc);

          if (point) {
            point.isShip = true;
          }

          inc = inc + 10;
        }

        this.displayNextFleetShip(location, ship, genericFleet);
      }
    }
  }

  setShipBottom(location: number, ship: Ship, orientation: Orientation, genericFleet: Fleet): void {
    const cellId = location - 1;

    if (ship.type === Shape.L_SHAPED) {
      const endPoint = ((ship.length - 1) * 10) - 10;

      if (location + endPoint <= 100 && location % 10 !== 0) {
        const shipPoints = this.shipService.calculateLShipBottom(cellId);

        this.setLShip(shipPoints);
        this.displayNextFleetShip(location, ship, genericFleet);
      }
    } else {
      const endPoint = (ship.length * 10) - 10;

      let inc = 0;

      if (location + endPoint <= 100) {
        for (let i = cellId; i < (cellId + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === cellId + inc);

          if (point) {
            point.isShip = true;
          }

          inc = inc + 10;
        }

        this.displayNextFleetShip(location, ship, genericFleet);
      }
    }
  }

  setShipRight(location: number, ship: Ship, orientation: Orientation, genericFleet: Fleet): void {
    const cellId = location - 1;

    if (ship.type === Shape.L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipRight(cellId);
      const endPoint = 90;

      if (location <= endPoint && (location % 10 === 0 || location % 10 > 2)) {
        this.setLShip(shipPoints);
        this.displayNextFleetShip(location, ship, genericFleet);
      }
    } else {
      const endPoint = location + ship.length - 2;

      if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
        for (let i = cellId; i < (cellId + ship.length); i++) {
          const point = this.playerGrid.find(element => element.id === i);

          if (point) {
            point.isShip = true;
          }
        }

        this.displayNextFleetShip(location, ship, genericFleet);
      }
    }
  }

  setShipLeft(location: number, ship: Ship, orientation: Orientation, genericFleet: Fleet): void {
    const cellId = location - 1;

    if (ship.type === Shape.L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipLeft(cellId);
      const endPoint = 10;

      if (location > endPoint && location % 10 < 9 && location % 10 !== 0) {
        this.setLShip(shipPoints);
        this.displayNextFleetShip(location, ship, genericFleet);
      }
    } else {
      if (ship.length === 1 || location % 10 >= 4 || location % 10 === 0) {
        for (let i = cellId; i > (cellId - ship.length); i--) {
          const point = this.playerGrid.find(element => element.id === i);

          if (point) {
            point.isShip = true;
          }
        }

        this.displayNextFleetShip(location, ship, genericFleet);
      }
    }
  }

  displayNextFleetShip(location: number, ship: Ship, fleet: Fleet): void {
    this.removeShipBorder(location, ship);
    this.displayNextShip(fleet);
  }

  displayNextShip(fleet: Fleet): void {
    if (++fleet.currentShip !== fleet.shipDetails.length) {
      this.placeShip(fleet.ships[fleet.currentShip], fleet);
    }
  }

  placeShip(ship: Ship, fleet: Fleet): void {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;

    this.selectedShipChange.emit(this.selectedShip);
    this.selectedFleetChange.emit(this.selectedFleet);
    this.shipPlacementPhaseChange.emit(this.shipPlacementPhase);
  }
}
