import { TestBed, inject } from '@angular/core/testing';

import { ShipService } from './ship.service';
import {GridService} from './grid.service';
import {BotService} from './bot.service';
import {GameConstants} from '../game/game_constants';
import {Ship} from '../models/ship.model';

describe('ShipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShipService]
    });
  });

  it('should create ShipService', inject([ShipService], (service: ShipService) => {
    expect(service).toBeTruthy();
  }));

  it('check: shipsAlive(grid: Grid[]) - should return true if at least one ship is alive',
    inject([ShipService], (service: ShipService) => {
      const gridService = new GridService();
      const botService = new BotService();

      const grid = gridService.getGrid(100);
      const fleet = botService.getBotsFleetPosition();

      fleet.map(element => {
        grid[element].isShip = true;
      });

      expect(
        service.shipsAlive(grid)
      ).toBeTruthy();
  }));

  it('check: shipsAlive(grid: Grid[]) - should return false if there is no alive ships',
    inject([ShipService], (service: ShipService) => {
      const gridService = new GridService();
      const grid = gridService.getGrid(100);

      expect(
        service.shipsAlive(grid)
      ).toBeFalsy();
    })
  );

  it('check: calculateLShipTop(cellId: number) - should return LShip points with TOP orientation',
    inject([ShipService], (service: ShipService) => {
      const shipPoints = service.calculateLShipTop(25);

      expect(shipPoints).toEqual([ 25, 15, 5, 6 ]);
    })
  );

  it('check: calculateLShipBottom(cellId: number) - should return LShip points with BOTTOM orientation',
    inject([ShipService], (service: ShipService) => {
      const shipPoints = service.calculateLShipBottom(50);

      expect(shipPoints).toEqual([ 50, 60, 70, 71 ]);
    })
  );

  it('check: calculateLShipLeft(cellId: number) - should return LShip points with LEFT orientation',
    inject([ShipService], (service: ShipService) => {
      const shipPoints = service.calculateLShipLeft(55);

      expect(shipPoints).toEqual([ 55, 45, 46, 47 ]);
    })
  );

  it('check: calculateLShipRight(cellId: number) - should return LShip points with RIGHT orientation',
    inject([ShipService], (service: ShipService) => {
      const shipPoints = service.calculateLShipRight(55);

      expect(shipPoints).toEqual([ 55, 65, 64, 63 ]);
    })
  );

  it(`check: calculateIShipBorderPoints(location: number, ship: Ship, orientation: string)
   - should return IShip border points`,
    inject([ShipService], (service: ShipService) => {
      const ship = new Ship({ 'name': 'iShaped', 'length': 4, 'type': GameConstants.I_SHAPED});
      const orientation = GameConstants.BOTTOM;
      const shipPoints = service.calculateIShipBorderPoints(54, ship, orientation);

      expect(shipPoints).toEqual([ 44, 54, 64, 74, 84, 94, 42, 52, 62, 72, 82, 92, 43, 93 ]);
    })
  );

  it(`check: calculateLShipBorderPoints(location: number, ship: Ship, orientation: string)
   - should return LShip border points`,
    inject([ShipService], (service: ShipService) => {
      const ship = new Ship({ 'name': 'lShaped', 'length': 4, 'type': GameConstants.L_SHAPED});
      const orientation = GameConstants.BOTTOM;
      const shipPoints = service.calculateLShipBorderPoints(54, ship, orientation);

      expect(shipPoints).toEqual([ 65, 75, 85, 82, 72, 62, 52, 42, 43, 83, 84, 64, 54, 44 ]);
    })
  );

  it(`check: calculateDotShipBorderPoints(location: number)
   - should return dotShip border points`,
    inject([ShipService], (service: ShipService) => {
      const shipPoints = service.calculateDotShipBorderPoints(54);

      expect(shipPoints).toEqual([ 44, 54, 64, 42, 52, 62, 43, 63 ]);
    })
  );

  it(`check: checkOverlap(location: number, ship: Ship, orientation: string, grid: Grid[])
   - should return false if the ships do not overlap`,
    inject([ShipService], (service: ShipService) => {
      const gridService = new GridService();
      const botService = new BotService();
      const grid = gridService.getGrid(100);
      const fleet = botService.getBotsFleetPosition();

      fleet.map(element => {
        grid[element].isShip = true;
      });

      const ship = new Ship({ 'name': 'dotShaped', 'length': 1, 'type': GameConstants.DOT_SHAPED});
      const orientation = GameConstants.BOTTOM;
      const checkOverlap = service.checkOverlap(84, ship, orientation, grid);

      expect(checkOverlap).toBeFalsy();
    })
  );

  it(`check: checkOverlap(location: number, ship: Ship, orientation: string, grid: Grid[])
   - should return true if the ships overlap`,
    inject([ShipService], (service: ShipService) => {
      const gridService = new GridService();
      const botService = new BotService();
      const grid = gridService.getGrid(100);
      const fleet = botService.getFixedFleetPosition(0);

      fleet.map(element => {
        grid[element].isShip = true;
      });

      const ship = new Ship({ 'name': 'dotShaped', 'length': 1, 'type': GameConstants.DOT_SHAPED});
      const orientation = GameConstants.BOTTOM;
      const checkOverlap = service.checkOverlap(1, ship, orientation, grid);

      expect(checkOverlap).toBeTruthy();
    })
  );
});
