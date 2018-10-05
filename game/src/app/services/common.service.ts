import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
}
