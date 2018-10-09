import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';
import {Ship} from '../models/ship.model';
import {CommonService} from '../services/common.service';
import {GameConstants} from './game_constants';

const SHIP_ORIENTATIONS = {
  TOP: GameConstants.TOP,
  BOTTOM: GameConstants.BOTTOM,
  LEFT: GameConstants.LEFT,
  RIGHT: GameConstants.RIGHT
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
  public orientation: string;
  public shipsOrientation: any;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.shipsOrientation = SHIP_ORIENTATIONS;
    this.titleLeftAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.titleTopNumbers = Array.from(Array(11).keys());
    this.orientation = this.shipsOrientation.BOTTOM;
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
    const orientationOptions = Object.keys(this.shipsOrientation);

    this.orientation = orientationOptions[this.commonService.getRandomInt(0, orientationOptions.length)];
  }

  placeShip(ship: Ship, fleet: Fleet) {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;
  }
}
