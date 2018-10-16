import { TestBed, inject } from '@angular/core/testing';

import { BotService } from './bot.service';
import {GridService} from './grid.service';

describe('BotService', () => {
  const botsFleetCombinationsCopy = [
    [0, 1, 2, 12, 8, 79, 60, 70, 80, 90],
    [4, 14, 24, 25, 41, 42, 43, 44, 78, 81],
    [98, 99, 89, 79, 9, 5, 50, 60, 70, 80],
    [35, 45, 55, 56, 98, 2, 32, 42, 52, 62]
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BotService]
    });
  });

  it('should create service', inject([BotService], (service: BotService) => {
    expect(service).toBeTruthy();
  }));

  it('check: getBotsFleetPosition - should return new bot ships position from existing list',
    inject([BotService], (service: BotService) => {
      const botService = new BotService();
      const newBotCombination = botService.getBotsFleetPosition();

      expect(
        botsFleetCombinationsCopy
          .some(combination => JSON.stringify(combination) === JSON.stringify(newBotCombination))
      ).toBeTruthy();
  }));

  it('check: getNextShot - should return next bot shot', inject([BotService], (service: BotService) => {
    const gridService = new GridService();
    const grid = gridService.getGrid(100);
    const nextShot = service.getNextShot(grid);
    const checkValidation = !grid[nextShot].isHit && !grid[nextShot].isMiss;

    expect(
      checkValidation
    ).toBeTruthy();
  }));
});
