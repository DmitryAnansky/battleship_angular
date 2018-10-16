import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

describe('WinnerComponent', () => {
  let component: WinnerComponent;
  const mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerComponent ],
      providers: [{ provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ name: 'Player' })
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let fixture: ComponentFixture<WinnerComponent>;

    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should get name of winner from active route`, async(() => {
    const fixture = TestBed.createComponent(WinnerComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app.route.params.value.name).toEqual('Player');
  }));


  it('should render winner name text', async(() => {
    const fixture = TestBed.createComponent(WinnerComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.card-title').textContent).toContain('Player won!');
  }));

  it('should render New Game button', async(() => {
    const fixture = TestBed.createComponent(WinnerComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.btn-dark').textContent).toContain('New Game');
  }));
});
