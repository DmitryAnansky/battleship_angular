import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { GameComponent } from './game.component';
import {BotGridComponent} from './bot-grid/bot-grid.component';
import {PlayerGridComponent} from './player-grid/player-grid.component';
import {GameInformationComponent} from './game-information/game-information.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {ShipService} from '../services/ship.service';
import {BotService} from '../services/bot.service';
import {Router} from '@angular/router';
import {GridService} from '../services/grid.service';

describe('GameComponent', () => {
  let fixture: ComponentFixture<GameComponent>;
  let component: GameComponent;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, BotGridComponent, PlayerGridComponent, GameInformationComponent, ControlPanelComponent ],
      providers: [ ShipService, BotService, { provide: Router, useValue: mockRouter }, GridService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create GameComponent', () => {
    expect(component).toBeTruthy();
  });

  it('if Place Ship clicked onPlaceShips should be called', async(() => {
    spyOn(component, 'onPlaceShips');

    const button = fixture.debugElement.nativeElement.querySelector('.place-ship-btn');

    button.click();

    fixture.whenStable().then(() => {
      expect(component.onPlaceShips).toHaveBeenCalled();
    });
  }));

  it('if RandomRotation clicked onRotateClick should be called', async(() => {
    component.displayRotationControl = true;
    fixture.detectChanges();

    spyOn(component, 'onRotateClick');

    const rotation_button = fixture.debugElement.nativeElement.querySelector('.random-rotation-btn');

    rotation_button.click();

    fixture.whenStable().then(() => {
      expect(component.onRotateClick).toHaveBeenCalled();
    });
  }));
});
