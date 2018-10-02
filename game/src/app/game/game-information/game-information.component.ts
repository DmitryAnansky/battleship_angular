import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-game-information',
  templateUrl: './game-information.component.html',
  styleUrls: ['./game-information.component.scss']
})
export class GameInformationComponent implements OnInit {
  @Input() consoleText;

  constructor() { }

  ngOnInit() {
  }

}
