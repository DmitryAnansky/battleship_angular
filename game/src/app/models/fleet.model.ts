import {GameConstants} from '../game/game_constants';
import {ShipEntity} from '../game/ship';
import {Ship} from './ship.model';

export class Fleet {
  public name: string;
  public readonly shipDetails: Ship[] = [
    { name: 'lShaped', length: 4, type: GameConstants.L_SHAPED },
    { name: 'iShaped', length: 4, type: GameConstants.I_SHAPED },
    { name: 'dotShaped', length: 1, type: GameConstants.DOT_SHAPED },
    { name: 'dotShaped', length: 1, type: GameConstants.DOT_SHAPED }
  ];
  public ships: ShipEntity[];
  public currentShip: number;

  constructor(name) {
    this.name = name;
    this.ships = [];
    this.currentShip = 0;
  }

  initShips(): void {
    for (let i = 0; i < this.shipDetails.length; i++) {
      this.ships[i] = new Ship({
        name: this.shipDetails[i].name,
        length: this.shipDetails[i].length,
        type: this.shipDetails[i].type
      });
    }
  };
}
