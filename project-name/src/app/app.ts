import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Main } from './main/main';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root' // the name of component that we will use 
  ,
  imports: [RouterOutlet,Header,Main,Footer],
  templateUrl: './app.html',//connection for html
  styleUrl: './app.css' // connection for css
})
export class App {
  protected readonly title = signal('project');
}
