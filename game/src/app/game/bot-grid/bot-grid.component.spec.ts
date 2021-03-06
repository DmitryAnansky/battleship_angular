import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { BotGridComponent } from './bot-grid.component';
import {ShipService} from '../../services/ship.service';
import {BotService} from '../../services/bot.service';
import {Router} from '@angular/router';

describe('BotGridComponent', () => {
  let fixture: ComponentFixture<BotGridComponent>;
  let component: BotGridComponent;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BotGridComponent ],
      providers: [ShipService, BotService, { provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create BotGridComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain grid', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.grid')).not.toEqual(null);
  }));
});
