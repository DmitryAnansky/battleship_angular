import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ShipService} from '../../services/ship.service';
import {Router} from '@angular/router';
import {BotService} from '../../services/bot.service';
import {Grid} from '../grid';

@Component({
  selector: 'app-bot-grid',
  templateUrl: './bot-grid.component.html',
  styleUrls: ['./bot-grid.component.scss']
})

export class BotGridComponent implements OnInit {
  @Input() botGrid;
  @Output() botGridChange: EventEmitter<Grid[]> = new EventEmitter();

  @Input() playerGrid;
  @Output() playerGridChange: EventEmitter<Grid[]> = new EventEmitter();

  @Input() titleTopNumbers;
  @Input() titleLeftAlphabet;
  @Input() gamePhase;

  @Input() consoleText;
  @Output() consoleTextChange: EventEmitter<string> = new EventEmitter();

  constructor(private shipService: ShipService,
              private botService: BotService,
              private router: Router) { }

  ngOnInit() {
    if (this.botGrid) {
      this.serBotsFleet(this.botGrid);
    }
  }

  serBotsFleet(grid: Grid[]) {
    const fleet = this.botService.getBotsFleetPosition();

    fleet.map(element => {
      grid[element].isShip = true;
    });

    this.botGridChange.emit(this.botGrid);
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
      this.consoleText = 'Hit';
    } else {
      point.isMiss = true;
      this.consoleText = 'Miss';

      this.botMakeShot();
    }

    this.botGridChange.emit(this.botGrid);
    this.consoleTextChange.emit(this.consoleText);

    if (!this.shipService.shipsAlive(this.botGrid)) {
      this.router.navigate(['/winner', 'Player']);
    }
  }

  botMakeShot() {
    const newShot = this.botService.getNextShot(this.playerGrid);

    if (this.playerGrid[newShot].isShip) {
      this.playerGrid[newShot].isHit = true;
      this.playerGridChange.emit(this.playerGrid);

      if (!this.shipService.shipsAlive(this.playerGrid)) {
        this.router.navigate(['/winner', 'Bot']);
      }

      this.botMakeShot();
    } else {
      this.playerGrid[newShot].isMiss = true;
      this.playerGridChange.emit(this.playerGrid);
    }
  }
}
