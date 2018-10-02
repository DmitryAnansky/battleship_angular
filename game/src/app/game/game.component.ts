import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';

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
    this.orientation = shipOrientation.BOTTOM;
    this.playerGrid = this.getGrid(100);
    this.botGrid = this.getGrid(100);
  }

  getGrid(num: number) {
    return Array.from(Array(num).keys()).map((id) => {
      return {'id': id, 'isShip': false, 'isHit':false, 'isMiss':false, 'isHovered': false};
    });
  }

  onPlaceShips() {
    this.displayRotationControl = true;
    this.consoleText = 'Use the mouse to place your ships on the battle field.';

    this.playerFleet = new Fleet("Player");
    this.playerFleet.initShips();

    this.placeShip(this.playerFleet.ships[this.playerFleet.currentShip], this.playerFleet);
  }

  onRotateClick() {
    const orientationOptions = Object.keys(shipOrientation);

    this.orientation = orientationOptions[this.getRandomInt(0, orientationOptions.length)];
  }

  placeShip = function (ship, fleet) {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;
  }

  onMouseExitPoint(e) {
    if (!this.shipPlacementPhase) {
      return;
    }

    const pointLocation = parseInt(e.target.id);

    switch (this.orientation) {
      case shipOrientation.TOP: {
        this.removeShipHorizontal(pointLocation);
        break;
      }
      case shipOrientation.LEFT: {
        this.removeShipHorizontal(pointLocation);
        break;
      }
      case shipOrientation.RIGHT: {
        this.removeShipRight(pointLocation);
        break;
      }
      case shipOrientation.BOTTOM: {
        this.removeShipVertical(pointLocation);
        break;
      }
      default: {
        this.removeShipHorizontal(pointLocation);
        break;
      }
    }
  }

  onMouseEnterPoint(e) {
    if (!this.shipPlacementPhase) {
      return;
    }

    let mousePosition = e.target.id;

    console.log(this.orientation);
    switch (this.orientation ) {
      case shipOrientation.TOP: {
        //TODO: replace
        this.displayShipRight(parseInt(mousePosition), this.selectedShip, e.target, this.selectedFleet);
        break;
      }
      case shipOrientation.LEFT: {
        //TODO: replace
        this.displayShipRight(parseInt(mousePosition), this.selectedShip, e.target, this.selectedFleet);
        break;
      }
      case shipOrientation.RIGHT: {
        this.displayShipRight(parseInt(mousePosition), this.selectedShip, e.target, this.selectedFleet);
        break;
      }
      case shipOrientation.BOTTOM: {
        this.displayShipBottom(parseInt(mousePosition), this.selectedShip, e.target, this.selectedFleet);
        break;
      }
      default: {
        this.displayShipBottom(parseInt(mousePosition), this.selectedShip, e.target, this.selectedFleet);
        break;
      }
    }
  }

  displayShipTop = function (location, ship, point, fleet) {}
  displayShipBottom = function (location, ship, point, fleet) {
    let context = this;
    let endPoint = (ship.length * 10) - 10;
    let inc = 0;

    if (location + endPoint <= 100) {
      for (let i = location; i < (location + ship.length); i++) {
        $(".bottom ." + (location + inc)).addClass("highlight");
        inc = inc + 10;
      }
      $(point).on("click", function () {
        context.setShip(location, ship, shipOrientation.BOTTOM, fleet, "self");
      });
    }
  };
  displayShipLeft = function (location, ship, point, fleet) {}
  displayShipRight= function (location, ship, point, fleet) {
    let context = this;
    let endPoint = location + ship.length - 2;

    if (!(endPoint % 10 >= 0 && endPoint % 10 < ship.length - 1)) {
      for (let i = location; i < (location + ship.length); i++) {
        $(".bottom ." + i).addClass("highlight");
      }

      $(point).on("click", function () {
        context.setShip(location, ship, shipOrientation.RIGHT, fleet, "self");
      });
    }
  };

  removeShipTop = function (location, ship, point, fleet) {}
  removeShipBottom = function (location, ship, point, fleet) {}
  removeShipLeft = function (location, ship, point, fleet) {}
  removeShipRight= function (location) {
    for (let i = location; i < location + 4; i++) {
      $(".bottom ." + i).removeClass("highlight");
    }
  };

  getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  removeShipVertical = function (location) {
    let inc = 0;
    for (let i = location; i < location + 4; i++) {
      $(".bottom ." + (location + inc)).removeClass("highlight");
      inc = inc + 10;
    }
  }

  removeShipHorizontal = function (location) {
    for (let i = location; i < location + 4; i++) {
      $(".bottom ." + i).removeClass("highlight");
    }
  }

  setShip = function (location, ship, orientation, genericFleet, type) {
    //if (!(this.checkOverlap(location, ship.length, orientation, genericFleet))) {
    if (!genericFleet.ships[genericFleet.currentShip]) {
      return;
    }

    if (orientation == shipOrientation.RIGHT) {
      genericFleet.ships[genericFleet.currentShip].populateHorzHits(location);
      //$(".text").text(output.placed(genericFleet.ships[genericFleet.currentShip].name + " has"));
      console.log(ship.type);
      for (var i = location; i < (location + ship.length); i++) {
        $(".bottom ." + i).addClass(genericFleet.ships[genericFleet.currentShip].type);
        $(".bottom ." + i).children().removeClass("hole");
      }
      if (++genericFleet.currentShip == genericFleet.numOfShips) {
        //$(".text").text(output.placed("ships have"));
        $(".bottom").find(".points").off("mouseenter");
        // clear the call stack
        //setTimeout(this.createCpuFleet, 100);
      } else {
        if (type == "random") this.randomSetup(genericFleet);
        else this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
      }

    } else {
      let inc = 0;
      console.log(ship.type);
      genericFleet.ships[genericFleet.currentShip].populateVertHits(location);
      //$(".text").text(output.placed(genericFleet.ships[genericFleet.currentShip].name + " has"));
      for (let i = location; i < (location + ship.length); i++) {
        $(".bottom ." + (location + inc)).addClass(genericFleet.ships[genericFleet.currentShip].type);
        $(".bottom ." + (location + inc)).children().removeClass("hole");
        inc = inc + 10;
      }
      if (++genericFleet.currentShip == genericFleet.numOfShips) {
        //$(".text").text(output.placed("ships have"));
        $(".bottom").find(".points").off("mouseenter");
        // clear the call stack
        //setTimeout(createCpuFleet, 100);
      } else {
        if (type == "random") this.randomSetup(genericFleet);
        else this.placeShip(genericFleet.ships[genericFleet.currentShip], genericFleet);
      }
    }
    //} else {
    // if (type == "random") this.randomSetup(genericFleet);
    // else $(".text").text(output.overlap);
    //}
  }


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
      } else this.randomSetup(genFleet);
    }
    return false;
  }
}
