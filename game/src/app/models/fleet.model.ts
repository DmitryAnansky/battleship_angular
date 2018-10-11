import {Ship} from './ship.model';
import {GameConstants} from '../game/game_constants';
import {ShipEntity} from '../game/ship';

export class Fleet{
  public name: string;
  public shipDetails: {'name': string, length: number, type: string}[];
  public numOfShips: number;
  public ships: ShipEntity[];
  public currentShipSize: number;
  public currentShip: number;

  constructor(name) {
    this.name = name;
    this.shipDetails = [
      { 'name': 'lShaped', 'length': 4, 'type': GameConstants.L_SHAPED},
      { 'name': 'iShaped', 'length': 4, 'type': GameConstants.I_SHAPED},
      { 'name': 'dotShaped', 'length': 1, 'type': GameConstants.DOT_SHAPED},
      { 'name': 'dotShaped', 'length': 1, 'type': GameConstants.DOT_SHAPED}
    ];
    this.numOfShips = this.shipDetails.length;
    this.ships = [];
    this.currentShipSize = 0;
    this.currentShip = 0;
  }

  initShips() {
    for(let i = 0; i < this.numOfShips; i++) {
      this.ships[i] = new Ship(this.shipDetails[i].name);
      this.ships[i].length = this.shipDetails[i].length;
      this.ships[i].type = this.shipDetails[i].type;
    }
  };
}
