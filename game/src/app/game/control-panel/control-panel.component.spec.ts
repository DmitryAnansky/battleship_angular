import { async, TestBed } from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';
import {Router} from '@angular/router';

describe('ControlPanelComponent', () => {
  let component: ControlPanelComponent;

  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlPanelComponent ],
      providers: [ { provide: Router, useValue: mockRouter } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    const fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ControlPanelComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render Exit button', async(() => {
    const fixture = TestBed.createComponent(ControlPanelComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.exit-btn').textContent).toContain('Exit');
  }));

  it('should render Place Ship button', async(() => {
    const fixture = TestBed.createComponent(ControlPanelComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.place-ship-btn').textContent).toContain('Place Ship');
  }));
});
