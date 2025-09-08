import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
    constructor(private router: Router) {}

gotoHome() {
    this.router.navigate(['home']);
  }
}
