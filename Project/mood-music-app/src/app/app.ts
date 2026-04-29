import { Component } from '@angular/core';
import { MoodComponent } from './mood/mood.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MoodComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}