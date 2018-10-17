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
    const fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create GameComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display app-game-information component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-game-information')).not.toEqual(null);
  }));

  it('should display start text inside app-game-information component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);
    const startGameText = 'Please place your ships on the game battle field.';

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-game-information .game-progress-log').textContent).toContain(startGameText);
  }));

  it('should display app-bot-grid component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-bot-grid')).not.toEqual(null);
  }));

  it('should display app-player-grid component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-player-grid')).not.toEqual(null);
  }));

  it('should display app-control-panel component', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-control-panel')).not.toEqual(null);
  }));

  it('should contain bot grid with title-top', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-bot-grid .title-top')).not.toEqual(null);
  }));

  it('should contain bot grid with title-left', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-bot-grid .title-left')).not.toEqual(null);
  }));

  it('should contain player grid with title-top', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-player-grid .title-top')).not.toEqual(null);
  }));

  it('should contain player grid with title-left', async(() => {
    const fixture = TestBed.createComponent(GameComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('app-player-grid .title-left')).not.toEqual(null);
  }));
});
