import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';
import {GameConstants} from './game_constants';
import {UtilsService} from '../services/utils.service';
import {Grid} from './grid';
import {ShipEntity, ShipOrientation} from './ship';

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
  public selectedShip: ShipEntity;
  public playerGrid: Grid[];
  public botGrid: Grid[];
  public selectedFleet: Fleet;
  public shipPlacementPhase: boolean = false;
  public gamePhase: boolean = false;
  public titleLeftAlphabet: string[];
  public consoleText: string = 'Please place your ships on the game battle field.\n' +
    ' The Game will start immediately after all ship\'s positioning.';
  public displayRotationControl: boolean = false;
  public playerFleet: Fleet;
  public orientation: string;
  public shipsOrientation: ShipOrientation;

  constructor(private utilsService: UtilsService) {
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

    this.orientation = orientationOptions[this.utilsService.getRandomInt(0, orientationOptions.length)];
  }

  placeShip(ship: ShipEntity, fleet: Fleet) {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;
  }
}
