import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mood',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mood.component.html',
  styleUrl: './mood.component.css'
})
export class MoodComponent {

  selectedMood: keyof typeof this.songs | '' = '';

  songs = {
  happy: [
    { title: 'Happy', artist: 'Pharrell Williams' },
    { title: 'Good Time', artist: 'Owl City' },
    { title: 'Uptown Funk', artist: 'Mark Ronson' },
    { title: 'Can’t Stop the Feeling', artist: 'Justin Timberlake' }
  ],
  sad: [
    { title: 'Someone Like You', artist: 'Adele' },
    { title: 'Let Her Go', artist: 'Passenger' },
    { title: 'Fix You', artist: 'Coldplay' }
  ],
  focus: [
    { title: 'Time', artist: 'Hans Zimmer' },
    { title: 'Weightless', artist: 'Ambient' },
    { title: 'Experience', artist: 'Ludovico Einaudi' }
  ],
  energetic: [
    { title: 'Believer', artist: 'Imagine Dragons' },
    { title: 'Stronger', artist: 'Kanye West' },
    { title: 'Titanium', artist: 'David Guetta' }
  ]
};

  setMood(mood: keyof typeof this.songs | '') {
    this.selectedMood = mood;
  }

  getSongs() {
    if (!this.selectedMood) return [];
    return this.songs[this.selectedMood];
  }
}