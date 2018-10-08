import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShipService} from '../../services/ship.service';

@Component({
  selector: 'app-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.scss']
})
export class BotGridComponent implements OnInit {
  @Input() botGrid;
  @Input() playerGrid;
  @Output() botGridChange: EventEmitter<any> = new EventEmitter();
  @Input() titleTopNumbers;
  @Input() titleLeftAlphabet;
  @Input() gamePhase;
  @Input() consoleText;

  constructor(private shipService: ShipService) { }

  ngOnInit() {
    if (this.botGrid) {
      this.serBotsFleet(this.botGrid);
    }
  }

  serBotsFleet(grid) {
    const fleet = this.shipService.getBotsFleetPosition();

    fleet.map(element => {
      grid[element].isShip = true;
    });
  }

  onPointClick(e) {
    if (!this.gamePhase) {
      return;
    }

    const activePointId = parseInt(e.currentTarget.id);
    const gridPoint = activePointId - 1;

    let point = this.botGrid.find(element => element.id === gridPoint);

    if (!point) {
      return;
    }

    if (point.isMiss) {
      return;
    }

    if (point.isShip) {
      point.isHit = true;
    } else {
      point.isMiss = true;
    }
  }
}
