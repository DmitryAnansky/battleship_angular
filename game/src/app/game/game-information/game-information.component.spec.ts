import { async, TestBed } from '@angular/core/testing';

import { GameInformationComponent } from './game-information.component';

describe('GameInformationComponent', () => {
  let component: GameInformationComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(GameInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create GameInformationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render game information block with no text', async(() => {
    const fixture = TestBed.createComponent(GameInformationComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.game-progress-log').textContent).toEqual('');
  }));
});
