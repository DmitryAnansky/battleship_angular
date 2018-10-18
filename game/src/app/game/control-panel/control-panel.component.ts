import { Component, Input, EventEmitter, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent {
  @Input() displayRotationControl;
  @Input() gamePhase;
  @Output() onPlaceShips: EventEmitter<any> = new EventEmitter();
  @Output() onRotateClick: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router) { }

  onExitClick(): void {
    this.router.navigate(['/intro']);
  }

  onClickPlaceShips(): void {
    this.onPlaceShips.emit();
  }

  onClickRotateShips(): void {
    this.onRotateClick.emit();
  }
}
