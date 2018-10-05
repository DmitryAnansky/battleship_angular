import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.scss']
})
export class BotGridComponent implements OnInit {
  @Input() botGrid;
  @Output() botGridChange: EventEmitter<any> = new EventEmitter();
  @Input() titleTopNumbers;
  @Input() titleLeftAlphabet;

  constructor() { }

  ngOnInit() {}
}
