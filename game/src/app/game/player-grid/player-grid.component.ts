import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShipService} from '../../services/ship.service';
import {Ship} from '../../models/ship.model';
import {Fleet} from '../../models/fleet.model';

const L_SHAPED = 'lShape';

@Component({
  selector: 'app-player-grid',
  templateUrl: './player-grid.component.html',
  styleUrls: ['./player-grid.component.scss']
})

export class PlayerGridComponent implements OnInit {
  @Input() titleTopNumbers;
  @Input() titleLeftAlphabet;
  @Input() orientation;
  @Input() shipOrientation;

  @Input() playerGrid;
  @Output() playerGridChange: EventEmitter<any> = new EventEmitter();

  @Input() shipPlacementPhase;
  @Output() shipPlacementPhaseChange: EventEmitter<boolean> = new EventEmitter();

  @Input() selectedShip;
  @Output() selectedShipChange: EventEmitter<any> = new EventEmitter();

  @Input() selectedFleet;
  @Output() selectedFleetChange: EventEmitter<any> = new EventEmitter();

  @Input() displayRotationControl;
  @Output() displayRotationControlChange: EventEmitter<boolean> = new EventEmitter();

  @Input() gamePhase;
  @Output() gamePhaseChange: EventEmitter<boolean> = new EventEmitter();

  @Input() consoleText;
  @Output() consoleTextChange: EventEmitter<string> = new EventEmitter();

  constructor(private shipService: ShipService) { }

  ngOnInit() {}

  onPointClick(e) {
    const activePointId = parseInt(e.currentTarget.id);

    if (this.shipPlacementPhase) {
      const point = this.playerGrid.find(element => element.id === activePointId - 1);

      point.isMiss = true;
      this.setShip(activePointId, this.selectedShip, this.orientation, this.selectedFleet);
    }
  }

  onMouseExitPoint(e) {
    if (!this.shipPlacementPhase) {
      return;
    }

    const pointLocation = parseInt(e.target.id);

    switch (this.orientation) {
      case this.shipOrientation.TOP: {
        this.removeShipTop(pointLocation);
        break;
      }
      case this.shipOrientation.LEFT: {
        this.removeShipLeft(pointLocation);
        break;
      }
      case this.shipOrientation.RIGHT: {
        this.removeShipRight(pointLocation);
        break;
      }
      case this.shipOrientation.BOTTOM: {
        this.removeShipBottom(pointLocation);
        break;
      }
      default: {
        this.removeShipBottom(pointLocation);
        break;
      }
    }
  }

  onMouseEnterPoint(e) {
    if (!this.shipPlacementPhase) {
      return;
    }

    let mousePosition = e.target.id;

    if (!this.selectedFleet.ships[this.selectedFleet.currentShip]) {
      return;
    }

    switch (this.orientation) {
      case this.shipOrientation.TOP: {
        this.displayShipTop(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case this.shipOrientation.LEFT: {
        this.displayShipLeft(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case this.shipOrientation.RIGHT: {
        this.displayShipRight(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case this.shipOrientation.BOTTOM: {
        this.displayShipBottom(parseInt(mousePosition), this.selectedShip);
        break;
      }
      default: {
        this.displayShipBottom(parseInt(mousePosition), this.selectedShip);
        break;
      }
    }
  }

  displayShipTop(location: number, ship: any) {
    const cellId = location - 1;

    let inc = 0;

    if (ship.type === L_SHAPED) {
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
          let point = this.playerGrid.find(element => element.id === (cellId - inc));

          if (point) {
            point.isHovered = true;
          }

          inc = inc + 10;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipBottom(location: number, ship: any) {
    const cellId = location - 1;

    let inc = 0;

    if (ship.type === L_SHAPED) {
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
          let point = this.playerGrid.find(element => element.id === (cellId + inc));

          if (point) {
            point.isHovered = true;
          }

          inc = inc + 10;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipLeft(location: number, ship: any) {
    const cellId = location - 1;

    if (ship.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipLeft(cellId);
      const endPoint = 10;

      if (location > endPoint && location % 10 < 9 && location % 10 != 0) {
        this.displayShip(shipPoints);
        this.displayShipBorder(location, ship);
      }
    } else {
      if (ship.length === 1 || location % 10 >= 4 || location % 10 === 0) {
        for (let i = cellId; i > (cellId - ship.length); i--) {
          let point = this.playerGrid.find(element => element.id === i);
          point.isHovered = true;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  displayShipRight(location: number, ship: any) {
    const cellId = location - 1;

    if (this.selectedShip.type === L_SHAPED) {
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
          let point = this.playerGrid.find(element => element.id === i);
          point.isHovered = true;
        }

        this.displayShipBorder(location, ship);
      }
    }
  };

  removeShipTop(location: number) {
    const cellId = location - 1;

    let inc = 0;

    if (this.selectedShip.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipTop(cellId);

      this.removeShip(shipPoints);
    } else {
      for (let i = location; i < location + 4; i++) {
        let point = this.playerGrid.find(element => element.id === (cellId - inc));

        if (point) {
          point.isHovered = false;
        }

        inc = inc + 10;
      }
    }

    this.removeShipBorder(location, this.selectedShip);
  };

  removeShipBottom(location: number) {
    const cellId = location - 1;

    let inc = 0;

    if (this.selectedShip.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipBottom(cellId);

      this.removeShip(shipPoints);
    } else {
      for (let i = location; i < location + 4; i++) {
        let point = this.playerGrid.find(element => element.id === (cellId + inc));

        if (point) {
          point.isHovered = false;
        }

        inc = inc + 10;
      }
    }

    this.removeShipBorder(location, this.selectedShip);
  };

  removeShipLeft(location: number) {
    const cellId = location - 1;

    if (this.selectedShip.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipLeft(cellId);

      this.removeShip(shipPoints);
    } else {
      for (let i = cellId; i > cellId - 4; i--) {
        let point = this.playerGrid.find(element => element.id === i);

        if (point) {
          point.isHovered = false;
        }
      }
    }

    this.removeShipBorder(location, this.selectedShip);
  };

  removeShipRight(location: number) {
    const cellId = location - 1;

    if (this.selectedShip.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipRight(cellId);

      this.removeShip(shipPoints);
    } else {
      for (let i = cellId; i < location + 3; i++) {
        let point = this.playerGrid.find(element => element.id === i);

        if (point) {
          point.isHovered = false;
        }
      }
    }

    this.removeShipBorder(location, this.selectedShip);
  };

  removeShip(shipPoints: number[]) {
    shipPoints.map(id => {
      let point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isHovered = false;
      }
    });
  }

  displayShip(shipPoints: number[]) {
    shipPoints.map(id => {
      let point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isHovered = true;
      }
    });
  }

  displayShipBorder(location: number, ship: any) {
    const borderPoints = this.shipService.calculateBorderPoints(location, ship, this.orientation);

    borderPoints.map(id => {
      let point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isBorder = true;
      }
    });
  }

  removeShipBorder(location: number, ship: any) {
    const borderPoints = this.shipService.calculateBorderPoints(location, ship, this.orientation);

    borderPoints.map(id => {
      let point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isBorder = false;
      }
    });
  }

  setLShip(shipPoints: number[]) {
    shipPoints.map(id => {
      let point = this.playerGrid.find(element => element.id === id);

      if (point) {
        point.isShip = true;
      }
    });
  }

  setShip(location: number, ship: any, orientation: string, genericFleet: any) {
    //if (!(this.checkOverlap(location, ship.length, orientation, genericFleet))) {
    if (!genericFleet.ships[genericFleet.currentShip]) {
      this.shipPlacementPhase = false;
      this.displayRotationControl = false;
      this.gamePhase = true;

      this.shipPlacementPhaseChange.emit(this.shipPlacementPhase);
      this.gamePhaseChange.emit(this.gamePhase);
      this.displayRotationControlChange.emit(this.displayRotationControl);

      return;
    }

    switch (this.orientation) {
      case this.shipOrientation.TOP: {
        this.setShipTop(location, ship, orientation, genericFleet);
        break;
      }
      case this.shipOrientation.LEFT: {
        this.setShipLeft(location, ship, orientation, genericFleet);
        break;
      }
      case this.shipOrientation.RIGHT: {
        this.setShipRight(location, ship, orientation, genericFleet);
        break;
      }
      case this.shipOrientation.BOTTOM: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
      default: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
    }

    this.playerGridChange.emit(this.playerGrid);
  }

  setShipTop(location: number, ship: any, orientation: string, genericFleet: any) {
    const cellId = location - 1;
    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateVertHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;
    this.consoleTextChange.emit(this.consoleText);

    if (ship.type === L_SHAPED) {
      const endPoint = ((ship.length + 1) * 10) - 10;

      if (ship.length === 1 || (location + endPoint > 60 && location % 10 !== 0)) {
        const shipPoints = this.shipService.calculateLShipTop(cellId);

        this.setLShip(shipPoints);
        this.removeShipBorder(location, ship);
        this.displayNextShip(genericFleet);
      }
    } else {
      let inc = 0;

      for (let i = location; i < (location + ship.length); i++) {
        let point = this.playerGrid.find(element => element.id === cellId - inc);

        if (point) {
          point.isShip = true;
        }

        inc = inc + 10;
      }

      this.removeShipBorder(location, ship);
      this.displayNextShip(genericFleet);
    }
  }

  setShipBottom(location: number, ship: any, orientation: string, genericFleet: any) {
    const cellId = location - 1;
    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateVertHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;
    this.consoleTextChange.emit(this.consoleText);

    if (ship.type === L_SHAPED) {
      const endPoint = ((ship.length - 1) * 10) - 10;

      if (location + endPoint <= 100 && location % 10 !== 0) {
        const shipPoints = this.shipService.calculateLShipBottom(cellId);

        this.setLShip(shipPoints);
        this.removeShipBorder(location, ship);
        this.displayNextShip(genericFleet);
      }
    } else {
      let inc = 0;

      for (let i = cellId; i < (cellId + ship.length); i++) {
        let point = this.playerGrid.find(element => element.id === cellId + inc);

        if (point) {
          point.isShip = true;
        }

        inc = inc + 10;
      }

      this.removeShipBorder(location, ship);
      this.displayNextShip(genericFleet);
    }
  }

  setShipRight(location: number, ship: any, orientation: string, genericFleet: any) {
    const cellId = location - 1;
    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;
    this.consoleTextChange.emit(this.consoleText);

    if (ship.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipRight(cellId);
      const endPoint = 90;

      if (location <= endPoint && (location % 10 === 0 || location % 10 > 2)) {
        this.setLShip(shipPoints);
        this.removeShipBorder(location, ship);
        this.displayNextShip(genericFleet);
      }
    } else {
      for (let i = cellId; i < (cellId + ship.length); i++) {
        let point = this.playerGrid.find(element => element.id === i);

        if (point) {
          point.isShip = true;
        }
      }

      this.removeShipBorder(location, this.selectedShip);
      this.displayNextShip(genericFleet);
    }
  }

  setShipLeft(location: number, ship: any, orientation: string, genericFleet: any) {
    const cellId = location - 1;
    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;
    this.consoleTextChange.emit(this.consoleText);

    if (ship.type === L_SHAPED) {
      const shipPoints = this.shipService.calculateLShipLeft(cellId);
      const endPoint = 10;

      if (location > endPoint && location % 10 < 9 && location % 10 != 0) {
        this.setLShip(shipPoints);
        this.removeShipBorder(location, ship);
        this.displayNextShip(genericFleet);
      }
    } else {
      for (let i = cellId; i > (cellId - ship.length); i--) {
        let point = this.playerGrid.find(element => element.id === i);

        if (point) {
          point.isShip = true;
        }
      }

      this.removeShipBorder(location, ship);
      this.displayNextShip(genericFleet);
    }
  }

  displayNextShip(fleet: any) {
    if (++fleet.currentShip == fleet.numOfShips) {
      // TODO: generate bot FLEET
      // this.createCpuFleet
    } else {
      this.placeShip(fleet.ships[fleet.currentShip], fleet);
    }
  }

  placeShip(ship: Ship, fleet: Fleet) {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;

    this.selectedShipChange.emit(this.selectedShip);
    this.selectedFleetChange.emit(this.selectedFleet);
    this.shipPlacementPhaseChange.emit(this.shipPlacementPhase);
  }

  checkOverlap = function (location, length, orientation, genFleet) {
    // ToDo: implement
  }
}
