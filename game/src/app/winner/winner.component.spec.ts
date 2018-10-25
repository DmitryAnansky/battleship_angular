import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerComponent } from './winner.component';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

describe('WinnerComponent', () => {
  let fixture: ComponentFixture<WinnerComponent>;
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
    fixture = TestBed.createComponent(WinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create WinnerComponent', () => {
    expect(component).toBeTruthy();
  });

  it(`should get name of winner from active route`, async(() => {
    const app = fixture.debugElement.componentInstance;

    expect(app.route.params.value.name).toEqual('Player');
  }));
});
