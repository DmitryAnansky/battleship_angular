import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {IntroComponent} from './intro/intro.component';
import {GameComponent} from './game/game.component';
import {ControlPanelComponent} from './game/control-panel/control-panel.component';
import {GameInformationComponent} from './game/game-information/game-information.component';
import {BotGridComponent} from './game/bot-grid/bot-grid.component';
import {PlayerGridComponent} from './game/player-grid/player-grid.component';
import {WinnerComponent} from './winner/winner.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue : '/' }],
      declarations: [
        AppComponent,
        IntroComponent,
        GameComponent,
        ControlPanelComponent,
        GameInformationComponent,
        BotGridComponent,
        PlayerGridComponent,
        WinnerComponent,
        NotFoundComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
