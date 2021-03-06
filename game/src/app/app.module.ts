import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {IntroComponent} from './intro/intro.component';
import {GameComponent} from './game/game.component';
import {AppRoutingModule} from './app-routing.module';
import {ControlPanelComponent} from './game/control-panel/control-panel.component';
import {GameInformationComponent} from './game/game-information/game-information.component';
import {BotGridComponent} from './game/bot-grid/bot-grid.component';
import {ShipService} from './services/ship.service';
import {PlayerGridComponent} from './game/player-grid/player-grid.component';
import {WinnerComponent} from './winner/winner.component';
import {BotService} from './services/bot.service';
import { NotFoundComponent } from './not-found/not-found.component';
import {GridService} from './services/grid.service';

@NgModule({
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [ShipService, BotService, GridService],
  bootstrap: [AppComponent]
})
export class AppModule { }
