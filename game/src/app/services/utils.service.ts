import { Injectable } from '@angular/core';

@Injectable()
export class UtilsService {

  constructor() { }

  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  getRandomFromArray(list: number[]) {
    return list[Math.floor(Math.random() * list.length)];
  }
}
