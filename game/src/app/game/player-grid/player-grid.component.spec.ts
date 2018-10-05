import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerGridComponent } from './player-grid.component';

describe('PlayerGridComponent', () => {
  let component: PlayerGridComponent;
  let fixture: ComponentFixture<PlayerGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
