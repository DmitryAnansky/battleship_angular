import {Component, OnInit} from '@angular/core';
import {Fleet} from '../models/fleet.model';
import {Orientation} from './game_constants';
import {Grid} from './grid';
import {ShipEntity} from './ship';
import {getRandomInt} from '../utils';
import {GridService} from '../services/grid.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  public readonly titleTopNumbers: number[] = Array.from(Array(11).keys());
  public selectedShip: ShipEntity;
  public playerGrid: Grid[];
  public botGrid: Grid[];
  public selectedFleet: Fleet;
  public shipPlacementPhase = false;
  public gamePhase = false;
  public readonly titleLeftAlphabet: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  public consoleText: string = 'Please place your ships on the game battle field.\n' +
    ' The Game will start immediately after all ship\'s positioning.';
  public displayRotationControl = false;
  public playerFleet: Fleet;
  public orientation: Orientation | any;

  constructor(private gridService: GridService) {
  }

  ngOnInit(): void {
    this.orientation = Orientation.BOTTOM;
    this.playerGrid = this.gridService.getGrid(100);
    this.botGrid = this.gridService.getGrid(100);
  }

  onPlaceShips(): void {
    this.displayRotationControl = true;
    this.consoleText = 'Use the mouse to place your ships on the battle field.';

    this.playerFleet = new Fleet('Player');
    this.playerFleet.initShips();

    this.placeShip(this.playerFleet.ships[this.playerFleet.currentShip], this.playerFleet);
  }

  onRotateClick(): void {
    const orientationOptions = Object.keys(Orientation);

    this.orientation = orientationOptions[getRandomInt(0, orientationOptions.length)];
  }

  placeShip(ship: ShipEntity, fleet: Fleet): void {
    this.selectedShip = ship;
    this.selectedFleet = fleet;
    this.shipPlacementPhase = true;
  }
}
