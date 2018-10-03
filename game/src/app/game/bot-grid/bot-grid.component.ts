import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.scss']
})
export class BotGridComponent implements OnInit {
  @Input() botGrid;

  public titleLeftAlphabet: string[];
  public titleTopNumbers: number[];

  constructor() { }

  ngOnInit() {
    this.titleLeftAlphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    this.titleTopNumbers = Array.from(Array(11).keys());
  }

}
