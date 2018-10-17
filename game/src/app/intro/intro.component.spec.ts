import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroComponent } from './intro.component';
import {Router} from '@angular/router';

describe('IntroComponent', () => {
  let fixture: ComponentFixture<IntroComponent>;
  let component: IntroComponent;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntroComponent ],
      providers: [{ provide: Router, useValue: mockRouter }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create IntroComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render New Game button', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.btn-dark').textContent).toContain('New Game');
  }));

  it('should render game name text', async(() => {
    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.card-title').textContent).toContain('Battle ship');
  }));
});
