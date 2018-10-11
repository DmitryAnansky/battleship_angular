import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
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

  onExitClick() {
    this.router.navigate(['/intro']);
  }

  onClickPlaceShips() {
    this.onPlaceShips.emit();
  }

  onClickRotateShips() {
    this.onRotateClick.emit();
  }
}
