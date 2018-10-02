import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import {AppRoutingModule} from './app-routing.module';
import { ControlPanelComponent } from './game/control-panel/control-panel.component';
import { GameInformationComponent } from './game/game-information/game-information.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    GameComponent,
    ControlPanelComponent,
    GameInformationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }