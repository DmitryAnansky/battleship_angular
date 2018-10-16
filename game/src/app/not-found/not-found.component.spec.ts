import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    let fixture: ComponentFixture<NotFoundComponent>;

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render not found page text', async(() => {
    const fixture = TestBed.createComponent(NotFoundComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.centered h1').textContent).toContain('404, page not found');
  }));

  it('should render the link to start page', async(() => {
    const fixture = TestBed.createComponent(NotFoundComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;

    expect(compiled.querySelector('.centered a').textContent).toContain('Go to the main page');
  }));

  it('should navigate to start page after link click', async(() => {
    const fixture = TestBed.createComponent(NotFoundComponent);

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const routerUrlLink = compiled.querySelector('.centered a').getAttribute('routerLink');

    expect(routerUrlLink).toEqual('/');
  }));
});
