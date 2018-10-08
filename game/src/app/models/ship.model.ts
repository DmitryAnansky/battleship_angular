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
}
