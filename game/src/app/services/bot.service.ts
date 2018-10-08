import { Injectable } from '@angular/core';
import {CommonService} from './common.service';

@Injectable()
export class BotService {

  constructor(private commonService: CommonService) { }

  getNextShot(grid) {
    const availablePoints = grid.filter(point => (!point.isMiss || point.isHit) && (point.isMiss || !point.isHit));
    const availablePointsIds = availablePoints.map(point => point.id);

    return this.commonService.getRandomFromArray(availablePointsIds);
  }
}
