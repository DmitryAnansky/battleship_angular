import { async, TestBed } from '@angular/core/testing';

import { PlayerGridComponent } from './player-grid.component';
import {ShipService} from '../../services/ship.service';

describe('PlayerGridComponent', () => {
  let component: PlayerGridComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGridComponent ],
      providers: [ShipService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(PlayerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create PlayerGridComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should contain grid', async(() => {
    const fixture = TestBed.createComponent(PlayerGridComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.grid')).not.toEqual(null);
  }));
});
