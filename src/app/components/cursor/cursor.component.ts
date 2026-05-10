import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cursor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css']
})
export class CursorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('dot', { static: true }) dotRef!: ElementRef<HTMLElement>;
  @ViewChild('ring', { static: true }) ringRef!: ElementRef<HTMLElement>;

  isHidden = false;
  isHovering = false;
  isClicking = false;
  isTouch = false;
  label: string | null = null;

  // Mouse target position
  private targetX = 0;
  private targetY = 0;
  // Smoothed dot position
  private dotX = 0;
  private dotY = 0;
  // Smoothed ring position (more lag = trailing effect)
  private ringX = 0;
  private ringY = 0;

  private rafId: number | null = null;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;
    this.isTouch = matchMedia('(hover: none)').matches;
    if (this.isTouch) return;

    // Run animation loop OUTSIDE Angular zone so it doesn't trigger change detection
    this.zone.runOutsideAngular(() => this.tick());
    this.attachInteractiveListeners();
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  @HostListener('document:mousemove', ['$event'])
  onMove(e: MouseEvent) {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    if (this.isHidden) this.isHidden = false;
  }

  @HostListener('document:mouseleave')
  onLeave() {
    this.isHidden = true;
  }

  @HostListener('document:mousedown')
  onDown() { this.isClicking = true; }

  @HostListener('document:mouseup')
  onUp() { this.isClicking = false; }

  /** Attach hover listeners to interactive elements - called once on init */
  private attachInteractiveListeners(): void {
    const selector = 'a, button, [data-cursor], input, textarea, select, label';
    document.addEventListener('mouseover', (e) => {
      const el = (e.target as HTMLElement).closest(selector) as HTMLElement | null;
      if (el) {
        this.zone.run(() => {
          this.isHovering = true;
          this.label = el.dataset['cursor'] ?? null;
        });
      }
    });
    document.addEventListener('mouseout', (e) => {
      const el = (e.target as HTMLElement).closest(selector);
      if (el) {
        this.zone.run(() => {
          this.isHovering = false;
          this.label = null;
        });
      }
    });
  }

  private tick = (): void => {
    // Lerp toward target — different speeds give the trailing effect
    this.dotX += (this.targetX - this.dotX) * 0.55;
    this.dotY += (this.targetY - this.dotY) * 0.55;
    this.ringX += (this.targetX - this.ringX) * 0.18;
    this.ringY += (this.targetY - this.ringY) * 0.18;

    if (this.dotRef && this.ringRef) {
      this.dotRef.nativeElement.style.transform =
        `translate3d(${this.dotX}px, ${this.dotY}px, 0) translate(-50%, -50%)`;
      this.ringRef.nativeElement.style.transform =
        `translate3d(${this.ringX}px, ${this.ringY}px, 0) translate(-50%, -50%)`;
    }

    this.rafId = requestAnimationFrame(this.tick);
  };
}
