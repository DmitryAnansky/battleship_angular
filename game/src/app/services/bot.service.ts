import {Injectable} from '@angular/core';
import {getRandomFromArray, getRandomInt} from '../utils';

const botsFleetCombinations = [
  [0, 1, 2, 12, 8, 79, 60, 70, 80, 90],
  [4, 14, 24, 25, 41, 42, 43, 44, 78, 81],
  [98, 99, 89, 79, 9, 5, 50, 60, 70, 80],
  [35, 45, 55, 56, 98, 2, 32, 42, 52, 62]
];

@Injectable()
export class BotService {

  constructor() { }

  getNextShot(grid) {
    const availablePoints = grid.filter(point => (!point.isMiss || point.isHit) && (point.isMiss || !point.isHit));
    const availablePointsIds = availablePoints.map(point => point.id);

    return getRandomFromArray(availablePointsIds);
  }

  getBotsFleetPosition() {
    const luckyNumber = getRandomInt(0, botsFleetCombinations.length);

    return botsFleetCombinations[luckyNumber];
  }

  getFixedFleetPosition(botsFleetCombinationId: number) {
    return botsFleetCombinations[botsFleetCombinationId];
  }
}
