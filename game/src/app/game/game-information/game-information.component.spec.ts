import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { GameInformationComponent } from './game-information.component';

describe('GameInformationComponent', () => {
  let fixture: ComponentFixture<GameInformationComponent>;
  let component: GameInformationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create GameInformationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render game information block with no text', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.game-progress-log').textContent).toEqual('');
  }));
});
