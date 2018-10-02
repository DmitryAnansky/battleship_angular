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
      this.ships[i].rotation = 'top';
    }
  };

  removeShip(position) {
    this.numOfShips--;
    //$('.text').text(output.sunk(this.name, this.ships[pos].name));
    //if (this == playerFleet) bot.sizeOfShipSunk = this.ships[pos].length;
    this.ships.splice(position, 1);
    if (this.ships.length == 0) {
      //$('.text').text(output.lost(this.name));
    }
    return true;
  };

  shipHit(shipName) {
    //$('.text').text(output.hit(this.name));
    return true;
  }

  checkIfHit(point) {
    for(let i = 0; i < this.numOfShips; i++) {
      if (this.ships[i].checkLocation(point)) {
        this.ships[i].getRidOf(this.ships[i].hitPoints.indexOf(point));
        if (this.ships[i].hitPoints == 0)return this.removeShip(i);
        else return this.shipHit(this.ships[i].name);
      }
    }
    return false;
  };
}
