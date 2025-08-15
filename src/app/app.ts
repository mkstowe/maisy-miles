import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./components/header/header";
import { Gallery } from "./components/gallery/gallery";

@Component({
  selector: 'app-root',
  imports: [Header, Gallery],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Maisy Miles');
  public currentYear = new Date().getFullYear();
}
