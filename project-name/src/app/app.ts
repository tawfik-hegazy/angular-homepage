import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { Signin } from './signin/signin';
import { AuthService } from './services/auth-service';
import { CFooter } from '../app/courses/footer/footer';
import { CMain } from '../app/courses/main/main';
import { CHeader } from '../app/courses/header/header';
import { AddCourse } from './add-course/add-course';
import { Admin } from './admin/admin';
import { AdminHeader } from './admin/admin-header/admin-header';
import { TSComponent } from './admin/t-s/t-s';
// import { CourseList } from './course-list/course-list';

@Component({
  selector: 'app-root', // the name of component that we will use
  imports: [RouterOutlet, Header, Footer, AdminHeader, TSComponent],
  templateUrl: './app.html', //connection for html
  styleUrl: './app.css', // connection for css
})
export class App implements OnInit {
  private authService = inject(AuthService);
  ngOnInit(): void {
    this.authService.autoLogin; // to stay  logged in
  }

  constructor(public router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin'); // 3mltha 3shan a7tha fy el app.html to make if condition
  }
}
