import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Stat {
  value: string;
  label: string;
}

interface FeaturedProject {
  client: string;
  tagline: string;
  mark: string;
  gradient: string;
  stats: Stat[];
}

interface Project {
  client: string;
  category: string;
  year: string;
  mark: string;
  gradient: string;
}

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements AfterViewInit, OnDestroy {
  // ----- Featured -----
  featured: FeaturedProject = {
    client: 'Carthage Land',
    tagline:
      'A heritage theme park reborn for a Gen Z audience — through a 90-day social campaign that turned local nostalgia into national virality.',
    mark: 'CL',
    gradient:
      'linear-gradient(135deg, #1B1FB8 0%, #2E32E0 45%, #06081F 100%)',
    stats: [
      { value: '10M+', label: 'Views' },
      { value: '+75%',  label: 'Followers' },
      { value: '+57%', label: 'Engagement' }
    ]
  };

  // ----- Project rows -----
  projects: Project[] = [
    {
      client: 'Marsa Studios',
      category: 'Strategy · Content',
      year: '2024',
      mark: 'MS',
      gradient: 'linear-gradient(135deg, #E8C547 0%, #C9A535 100%)'
    },
    {
      client: 'Olea & Co.',
      category: 'UGC · Paid social',
      year: '2024',
      mark: 'OC',
      gradient: 'linear-gradient(135deg, #131593 0%, #2E32E0 100%)'
    },
    {
      client: 'Berber Coffee',
      category: 'Branding · Reels',
      year: '2024',
      mark: 'BC',
      gradient: 'linear-gradient(135deg, #4A4F66 0%, #0B0E2A 100%)'
    },
    {
      client: 'Sahara Run',
      category: 'Influencer · Event',
      year: '2025',
      mark: 'SR',
      gradient: 'linear-gradient(135deg, #F2D060 0%, #E8C547 50%, #C9A535 100%)'
    },
    {
      client: 'La Médina Hotel',
      category: 'Production · Campaign',
      year: '2025',
      mark: 'LM',
      gradient: 'linear-gradient(135deg, #2E32E0 0%, #1B1FB8 50%, #06081F 100%)'
    },
    {
      client: 'TUNIS.fm',
      category: 'Community · Editorial',
      year: '2025',
      mark: 'TF',
      gradient: 'linear-gradient(135deg, #E8C547 0%, #1B1FB8 100%)'
    }
  ];

  // ----- Floating preview state -----
  previewVisible = false;
  previewX = 0;
  previewY = 0;
  previewRotate = -4;
  previewMark = '';
  previewGradient = '';

  private gridRect: DOMRect | null = null;
  private mouseX = 0;
  private mouseY = 0;
  private targetX = 0;
  private targetY = 0;
  private rafId: number | null = null;

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    this.tick();

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.work .reveal').forEach((el) => observer.observe(el));
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  // ----- Featured hover -----
  onFeaturedEnter(): void { /* hover handled in CSS */ }
  onFeaturedLeave(): void { /* hover handled in CSS */ }

  // ----- Row hover -----
  onRowEnter(p: Project): void {
    this.previewMark = p.mark;
    this.previewGradient = p.gradient;
    this.previewVisible = true;
    this.previewRotate = -4 + (Math.random() * 8);
  }

  onRowLeave(): void {
    this.previewVisible = false;
  }

  // ----- Grid mouse tracking -----
  onGridMove(e: MouseEvent): void {
    const target = e.currentTarget as HTMLElement;
    this.gridRect = target.getBoundingClientRect();
    this.targetX = e.clientX - this.gridRect.left;
    this.targetY = e.clientY - this.gridRect.top;
  }

  onGridLeave(): void {
    this.previewVisible = false;
  }

  private tick = (): void => {
    // Smooth lerp toward mouse position
    this.mouseX += (this.targetX - this.mouseX) * 0.18;
    this.mouseY += (this.targetY - this.mouseY) * 0.18;
    this.previewX = this.mouseX;
    this.previewY = this.mouseY;
    this.rafId = requestAnimationFrame(this.tick);
  };
}
