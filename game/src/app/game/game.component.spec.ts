import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import {BotGridComponent} from './bot-grid/bot-grid.component';
import {PlayerGridComponent} from './player-grid/player-grid.component';
import {GameInformationComponent} from './game-information/game-information.component';
import {ControlPanelComponent} from './control-panel/control-panel.component';
import {ShipService} from '../services/ship.service';
import {BotService} from '../services/bot.service';
import {Router} from '@angular/router';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent, BotGridComponent, PlayerGridComponent, GameInformationComponent, ControlPanelComponent ],
      providers: [ ShipService, BotService, { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
