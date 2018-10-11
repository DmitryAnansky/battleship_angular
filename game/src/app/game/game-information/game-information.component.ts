import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-game-information',
  templateUrl: './game-information.component.html',
  styleUrls: ['./game-information.component.scss']
})
export class GameInformationComponent {
  @Input() consoleText;

  constructor() { }

}
