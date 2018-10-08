import {Ship} from './ship.model';

export class Fleet{
  private name: string;
  private shipDetails: {'name': string, length: number, type: string}[];
  private numOfShips: number;
  public ships: any[];
  private currentShipSize: number;
  public currentShip: number;

  constructor(name) {
    this.name = name;
    this.shipDetails = [
      { 'name': 'lShaped', 'length': 4, 'type': 'lShape'},
      { 'name': 'iShaped', 'length': 4, 'type': 'iShape'},
      { 'name': 'dotShaped', 'length': 1, 'type': 'dotShape'},
      { 'name': 'dotShaped', 'length': 1, 'type': 'dotShape'}
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
