import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';
import {Ship} from '../models/ship.model';

declare var $: any;

const shipOrientation = {
  TOP: 'TOP',
  BOTTOM: 'BOTTOM',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

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

  constructor() {
  }

  ngOnInit() {
    this.titleLeftAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.titleTopNumbers = Array.from(Array(11).keys());
    this.orientation = shipOrientation.TOP;
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
        isHovered: false
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

  placeShip = function (ship: Ship, fleet: Fleet) {
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

  calculateLShipTop(cellId) {
    const inc = 10;

    return [cellId, cellId - inc, cellId - 2 * inc, cellId - (2 * inc - 1)]
  }

  displayShipTop(location, ship) {
    const cellId = location - 1;

    let inc = 0;

    if (ship.type === 'lShape') {
      const endPoint = ((ship.length + 1) * 10) - 10;

      if (ship.length === 1 || location + endPoint > 60) {
        console.log('Some LSHAPED');

        const shipPoints = this.calculateLShipTop(cellId);

        shipPoints.map(id => {
          let point = this.playerGrid.find(element => element.id === id);

          if (point) {
            point.isHovered = true;
          }
        });
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
      }
    }
  };

  displayShipBottom(location, ship) {
    const cellId = location - 1;
    const endPoint = (ship.length * 10) - 10;

    let inc = 0;

    if (location + endPoint <= 100) {
      for (let i = location; i < (location + ship.length); i++) {
        let point = this.playerGrid.find(element => element.id === (cellId + inc));

        if (point) {
          point.isHovered = true;
        }

        inc = inc + 10;
      }
    }
  };

  displayShipLeft(location, ship) {
    const cellId = location - 1;

    if (ship.length === 1 || location % 10 >= 4 || location % 10 === 0) {
      for (let i = cellId; i > (cellId - ship.length); i--) {
        let point = this.playerGrid.find(element => element.id === i);
        point.isHovered = true;
      }
    }
  };

  displayShipRight(location, ship) {
    const cellId = location - 1;
    const endPoint = location + ship.length - 2;

    if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
      for (let i = cellId; i < (cellId + ship.length); i++) {
        let point = this.playerGrid.find(element => element.id === i);
        point.isHovered = true;
      }
    }
  };

  removeShipTop(location) {
    const cellId = location - 1;

    let inc = 0;

    if (this.selectedShip.type === 'lShape') {
      // TODO: implement
    } else {
      for (let i = location; i < location + 4; i++) {
        let point = this.playerGrid.find(element => element.id === (cellId - inc));

        if (point) {
          point.isHovered = false;
        }

        inc = inc + 10;
      }
    }
  };

  removeShipBottom(location) {
    const cellId = location - 1;

    let inc = 0;

    for (let i = location; i < location + 4; i++) {
      let point = this.playerGrid.find(element => element.id === (cellId + inc));

      if (point) {
        point.isHovered = false;
      }

      inc = inc + 10;
    }
  };

  removeShipLeft(location) {
    const cellId = location - 1;

    for (let i = cellId; i > cellId - 4; i--) {
      let point = this.playerGrid.find(element => element.id === i);

      if (point) {
        point.isHovered = false;
      }
    }
  };

  removeShipRight(location) {
    const cellId = location - 1;

    for (let i = cellId; i < location + 3; i++) {
      let point = this.playerGrid.find(element => element.id === i);

      if (point) {
        point.isHovered = false;
      }
    }
  };

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  setShipTop(location, ship, orientation, genericFleet) {
    const cellId = location - 1;
    // TODO: render ships based on type
    console.log(ship.type);

    let inc = 0;

    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateVertHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;

    for (let i = location; i < (location + ship.length); i++) {
      let point = this.playerGrid.find(element => element.id === cellId - inc);

      if (point) {
        point.isShip = true;
      }

      inc = inc + 10;
    }

    if (++genericFleet.currentShip == genericFleet.numOfShips) {
      // TODO: generate bot FLEET
      // createCpuFleet
    } else {
      this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
    }
  }

  setShipBottom(location, ship, orientation, genericFleet) {
    const cellId = location - 1;
    // TODO: render ships based on type
    console.log(ship.type);

    let inc = 0;

    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateVertHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;

    for (let i = cellId; i < (cellId + ship.length); i++) {
      let point = this.playerGrid.find(element => element.id === cellId + inc);

      if (point) {
        point.isShip = true;
      }

      inc = inc + 10;
    }

    if (++genericFleet.currentShip == genericFleet.numOfShips) {
      // TODO: generate bot FLEET
      // createCpuFleet
    } else {
      this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
    }
  }

  setShipRight(location, ship, orientation, genericFleet) {
    const cellId = location - 1;
    // TODO: render ships based on type
    console.log(ship.type);

    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;

    for (let i = cellId; i < (cellId + ship.length); i++) {
      let point = this.playerGrid.find(element => element.id === i);

      if (point) {
        point.isShip = true;
      }
    }

    if (++genericFleet.currentShip == genericFleet.numOfShips) {
      // TODO: generate bot FLEET
      // this.createCpuFleet
    } else {
      this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
    }
  }

  setShipLeft(location, ship, orientation, genericFleet) {
    const cellId = location - 1;
    // TODO: render ships based on type
    console.log(ship.type);

    // TODO: change this part
    genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);

    this.consoleText = `${this.selectedShip.type} has been placed
     [${genericFleet.currentShip + 1}/${genericFleet.numOfShips}]`;

    for (let i = cellId; i > (cellId - ship.length); i--) {
      let point = this.playerGrid.find(element => element.id === i);

      if (point) {
        point.isShip = true;
      }
    }

    if (++genericFleet.currentShip == genericFleet.numOfShips) {
      // TODO: generate bot FLEET
      // this.createCpuFleet
    } else {
      this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
    }
  }

  setShip(location, ship, orientation, genericFleet) {
    //if (!(this.checkOverlap(location, ship.length, orientation, genericFleet))) {
    if (!genericFleet.ships[genericFleet.currentShip]) {
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
    let loc = location;
    if (this.orientation == shipOrientation.RIGHT) {
      let end = location + length;
      for (; location < end; location++) {
        for (let i = 0; i < genFleet.currentShip; i++) {
          if (genFleet.ships[i].checkLocation(location)) {
            return true;
            // if (genFleet == cpuFleet) randomSetup(genFleet);
            // else return true;
          }
        } // end of for loop
      } // end of for loop
    } else {
      let end = location + (10 * length);
      for (; location < end; location += 10) {
        for (let i = 0; i < genFleet.currentShip; i++) {
          if (genFleet.ships[i].checkLocation(location)) {
            // if (genFleet == cpuFleet) randomSetup(genFleet);
            // else return true;
            return true
          }
        }
      }
    } // end of if/else
    if (genFleet == this.botFleet && genFleet.currentShip < genFleet.numOfShips) {
      if (orientation == shipOrientation.RIGHT) genFleet.ships[genFleet.currentShip++].populateHorzHits(loc);
      else genFleet.ships[genFleet.currentShip++].populateVertHits(loc);
      if (genFleet.currentShip == genFleet.numOfShips) {
        // clear the call stack
        setTimeout(this.startGame, 500);
      } else {
        //this.randomSetup(genFleet);
      }
    }
    return false;
  }
}
