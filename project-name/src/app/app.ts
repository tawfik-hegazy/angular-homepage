import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Main } from './main/main';
import { Footer } from './footer/footer';
import { Signin } from './signin/signin';
import { AuthService } from './services/auth-service';
import{CFooter} from '../app/courses/footer/footer';
import{CMain} from '../app/courses/main/main'
import{CHeader} from '../app/courses/header/header'
import { AddCourse } from './add-course/add-course';
// import { CourseList } from './course-list/course-list';


@Component({
  selector: 'app-root' // the name of component that we will use 
  ,
  imports: [RouterOutlet,Header,Main,Footer, Signin,CFooter,CHeader,CMain,AddCourse],
  templateUrl: './app.html',//connection for html
  styleUrl: './app.css' // connection for css
})

  export class App implements OnInit{

private authService=inject(AuthService);
ngOnInit(): void {
  this.authService.autoLogin
}

  }


