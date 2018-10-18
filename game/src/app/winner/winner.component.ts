import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-winner',
  templateUrl: './winner.component.html',
  styleUrls: ['./winner.component.scss']
})
export class WinnerComponent implements OnInit {
  public winner: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.winner = params.hasOwnProperty('name') ? params.name : 'no one';
    });
  }

  onNewGameClick(): void {
    this.router.navigate(['/game']);
  }

}
