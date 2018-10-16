import { TestBed, inject } from '@angular/core/testing';

import { GridService } from './grid.service';

describe('GridService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GridService]
    });
  });

  it('should create service', inject([GridService], (service: GridService) => {
    expect(service).toBeTruthy();
  }));

  it('check: getGrid(num: number) - should return new grid', inject([GridService], (service: GridService) => {
    const grid = service.getGrid(100);
    const validationCheck = grid.length === 100 &&
      grid.every(cell => cell.hasOwnProperty('isShip') &&
        cell.hasOwnProperty('isMiss') &&
        cell.hasOwnProperty('id') &&
        cell.hasOwnProperty('isHit') &&
        cell.hasOwnProperty('isHovered') &&
        cell.hasOwnProperty('isBorder'));

    expect(
      validationCheck
    ).toBeTruthy();
  }));
});
