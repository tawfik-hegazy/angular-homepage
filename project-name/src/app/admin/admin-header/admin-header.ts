import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-admin-header',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-header.html',
  styleUrl: './admin-header.css',
})
export class AdminHeader {
  private authService = inject(AuthService);
  constructor(private router: Router) {}

  gotohome() {
    this.router.navigate(['home']);
  }
}
