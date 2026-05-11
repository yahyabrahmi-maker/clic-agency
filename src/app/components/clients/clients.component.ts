import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Client {
  name: string;
  mark: string;
  logo?: string; 
}

interface Testimonial {
  quote: string;
  name: string;
  initials: string;
  role: string;
  color: string;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements AfterViewInit, OnDestroy {

clients: Client[] = [
  { name: 'Peak Tunisie',                          mark: 'PK', logo: 'assets/peaklogo.png' },
  { name: 'Anta Sport',                          mark: 'AN', logo: 'assets/antalogo.png' },
  { name: 'Carthage Land',                 mark: 'CL', logo: 'assets/cllogo.png' },
  { name: 'Canadian Int. School', mark: 'CI', logo: 'assets/cislogo.png' },
  { name: 'Keraa',                         mark: 'KR', logo: 'assets/keraalogo.png' }
];

  testimonials: Testimonial[] = [
    {
      quote:
        'CLIC didn\'t just make us look good online — they rebuilt how we think about our audience. In three months, our content stopped feeling like ads and started feeling like a conversation people actually wanted to be in.',
      name: 'Yassine Ben Salem',
      initials: 'YB',
      role: 'Marketing Director · Carthage Land',
      color: 'linear-gradient(135deg, #E8C547, #C9A535)'
    },
    {
      quote:
        'Working with this team felt less like hiring an agency and more like adding a creative co-founder. Sharp instincts, ridiculous turnaround times, and zero fluff — exactly what a young brand needs.',
      name: 'Lina Chebbi',
      initials: 'LC',
      role: 'Founder · Olea & Co.',
      color: 'linear-gradient(135deg, #2E32E0, #1B1FB8)'
    },
    {
      quote:
        'They gave our café a personality the algorithm actually rewards. The reels they produced got us real foot traffic — not just likes — within the first month.',
      name: 'Karim Daoud',
      initials: 'KD',
      role: 'Owner · Berber Coffee',
      color: 'linear-gradient(135deg, #F2D060, #E8C547)'
    }
  ];

  activeIndex = 0;
  prevIndex = -1;

  private autoplayId: number | null = null;
  private autoplayDelay = 6500;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Reveal observer
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.clients .reveal').forEach((el) => observer.observe(el));

    // Autoplay testimonials (outside Angular zone — only triggers CD on slide change)
    this.zone.runOutsideAngular(() => {
      this.autoplayId = window.setInterval(() => {
        this.zone.run(() => this.next());
      }, this.autoplayDelay);
    });
  }

  ngOnDestroy(): void {
    if (this.autoplayId !== null) clearInterval(this.autoplayId);
  }

  next(): void {
    this.prevIndex = this.activeIndex;
    this.activeIndex = (this.activeIndex + 1) % this.testimonials.length;
    this.resetAutoplay();
  }

  prev(): void {
    this.prevIndex = this.activeIndex;
    this.activeIndex =
      (this.activeIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.resetAutoplay();
  }

  goTo(i: number): void {
    if (i === this.activeIndex) return;
    this.prevIndex = this.activeIndex;
    this.activeIndex = i;
    this.resetAutoplay();
  }

  private resetAutoplay(): void {
    if (this.autoplayId !== null) {
      clearInterval(this.autoplayId);
      this.zone.runOutsideAngular(() => {
        this.autoplayId = window.setInterval(() => {
          this.zone.run(() => this.next());
        }, this.autoplayDelay);
      });
    }
  }
}
