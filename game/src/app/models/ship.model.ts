export class Ship{
  private name: string;
  private type: string;
  private length: number = 0;

  constructor(...args) {
    Object.assign(this, ...args);
  }
}
