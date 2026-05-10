import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css']
})
export class MarqueeComponent {
  /** Words rotated through the marquee. Repeated 3× in template for seamless loop. */
  words: string[] = [
    'Social media',
    'Content strategy',
    'Creative production',
    'Influencer marketing',
    'UGC campaigns',
    'Brand training'
  ];
}
