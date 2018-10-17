import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import { ControlPanelComponent } from './control-panel.component';
import {Router} from '@angular/router';

describe('ControlPanelComponent', () => {
  let fixture: ComponentFixture<ControlPanelComponent>;
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
    fixture = TestBed.createComponent(ControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create ControlPanelComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render Exit button', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.exit-btn').textContent).toContain('Exit');
  }));

  it('should render Place Ship button', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.place-ship-btn').textContent).toContain('Place Ship');
  }));

  it('if Exit button clicked onExitClick should be called', async(() => {
    spyOn(component, 'onExitClick');

    const button = fixture.debugElement.nativeElement.querySelector('.exit-btn');

    button.click();

    fixture.whenStable().then(() => {
      expect(component.onExitClick).toHaveBeenCalled();
    });
  }));
});
