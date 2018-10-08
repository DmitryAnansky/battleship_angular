import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
