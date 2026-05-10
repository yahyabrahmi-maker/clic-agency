import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat { value: string; label: string; }

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {
  year = new Date().getFullYear();

  stats: Stat[] = [
    { value: '10M+', label: 'Views generated' },
    { value: '+75%', label: 'Avg. growth' },
    { value: '+57%', label: 'Engagement lift' },
    { value: '<3mo', label: 'To trend' }
  ];
}
