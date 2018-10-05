import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';
import {Ship} from '../models/ship.model';
import {ShipService} from '../services/ship.service';

declare var $: any;

const shipOrientation = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};
const lShaped = 'lShape';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  public titleTopNumbers: number[];
  public selectedShip: any;
  public playerGrid: any;
  public botGrid: any;
  public selectedFleet: any;
  public shipPlacementPhase: boolean = false;
  public gamePhase: boolean = false;
  public titleLeftAlphabet: string[];
  public consoleText: string = 'Please place your ships on the game battle field.\n' +
    ' The Game will start immediately after all ship\'s positioning.';
  public displayRotationControl: boolean = false;
  public playerFleet: Fleet;
  public botFleet: Fleet;
  public orientation: string;

  constructor(private shipService: ShipService) {
  }

  ngOnInit() {
    this.titleLeftAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.titleTopNumbers = Array.from(Array(11).keys());
    this.orientation = shipOrientation.RIGHT;
    this.playerGrid = this.getGrid(100);
    this.botGrid = this.getGrid(100);
  }

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

  onPlaceShips() {
    this.displayRotationControl = true;
    this.consoleText = 'Use the mouse to place your ships on the battle field.';

    this.playerFleet = new Fleet('Player');
    this.playerFleet.initShips();

    this.placeShip(this.playerFleet.ships[this.playerFleet.currentShip], this.playerFleet);
  }

  onRotateClick() {
    const orientationOptions = Object.keys(shipOrientation);

    this.orientation = orientationOptions[this.getRandomInt(0, orientationOptions.length)];
  }

  placeShip(ship: Ship, fleet: Fleet) {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;
  }

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
      case shipOrientation.TOP: {
        this.removeShipTop(pointLocation);
        break;
      }
      case shipOrientation.LEFT: {
        this.removeShipLeft(pointLocation);
        break;
      }
      case shipOrientation.RIGHT: {
        this.removeShipRight(pointLocation);
        break;
      }
      case shipOrientation.BOTTOM: {
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
      case shipOrientation.TOP: {
        this.displayShipTop(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case shipOrientation.LEFT: {
        this.displayShipLeft(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case shipOrientation.RIGHT: {
        this.displayShipRight(parseInt(mousePosition), this.selectedShip);
        break;
      }
      case shipOrientation.BOTTOM: {
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

    if (ship.type === lShaped) {
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

    if (ship.type === lShaped) {
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

    if (ship.type === lShaped) {
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

    if (this.selectedShip.type === lShaped) {
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

    if (this.selectedShip.type === lShaped) {
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

    if (this.selectedShip.type === lShaped) {
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

    if (this.selectedShip.type === lShaped) {
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

    if (this.selectedShip.type === lShaped) {
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  setShipTop(location: number, ship: any, orientation: string, genericFleet: any) {
    const cellId = location - 1;
    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateVertHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;

    if (ship.type === lShaped) {
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

    if (ship.type === lShaped) {
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

    if (ship.type === lShaped) {
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

    if (ship.type === lShaped) {
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

  setShip(location: number, ship: any, orientation: string, genericFleet: any) {
    //if (!(this.checkOverlap(location, ship.length, orientation, genericFleet))) {
    if (!genericFleet.ships[genericFleet.currentShip]) {
      this.shipPlacementPhase = false;
      this.displayRotationControl = false;
      this.gamePhase = true;

      return;
    }

    switch (this.orientation) {
      case shipOrientation.TOP: {
        this.setShipTop(location, ship, orientation, genericFleet);
        break;
      }
      case shipOrientation.LEFT: {
        this.setShipLeft(location, ship, orientation, genericFleet);
        break;
      }
      case shipOrientation.RIGHT: {
        this.setShipRight(location, ship, orientation, genericFleet);
        break;
      }
      case shipOrientation.BOTTOM: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
      default: {
        this.setShipBottom(location, ship, orientation, genericFleet);
        break;
      }
    }
  };

  checkOverlap = function (location, length, orientation, genFleet) {
    // ToDo: implement
  }
}
