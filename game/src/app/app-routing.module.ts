import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IntroComponent} from './intro/intro.component';
import {GameComponent} from './game/game.component';
import {WinnerComponent} from './winner/winner.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    component: IntroComponent
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'winner/:name',
    component: WinnerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
