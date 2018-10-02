export class Ship{
  private name: string;
  private type: string;
  private rotation: 'top' | 'bottom' | 'left' | 'right';
  private length: number = 0;
  private hitPoints: number[];

  constructor(...args) {
    Object.assign(this, ...args);
    this.hitPoints = [];
  }

  populateHorzHits(start: number) {
    for (let i = 0; i < this.length; i++, start++) {
      this.hitPoints[i] = start;
    }
  }

  populateVertHits(start: number) {
    for (let i = 0; i < this.length; i++, start += 10) {
      this.hitPoints[i] = start;
    }
  }

  checkLocation(loc) {
    for (let i = 0; i < this.length; i++) {
      if (this.hitPoints[i] == loc) return true;
    }
    return false;
  }

  getRidOf(pos) {
    this.hitPoints.splice(pos, 1);
  }
}
