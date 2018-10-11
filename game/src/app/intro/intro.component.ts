import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  constructor(private router: Router) { }

  onNewGameClick() {
    this.router.navigate(['/game']);
  }
}
