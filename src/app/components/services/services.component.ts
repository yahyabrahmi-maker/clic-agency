import {
  AfterViewInit,
  Component,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  number: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  bullets: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements AfterViewInit, OnDestroy {

  /** Index of the currently expanded card. -1 = none open */
  activeIndex = 0;

  /** Was the activeIndex set by user click? Click locks; hover only previews. */
  private clickLocked = true;
  private observer?: IntersectionObserver;

  services: Service[] = [
    {
      number: '/01',
      title: 'Social media',
      tagline: 'Always-on content that earns the scroll.',
      description:
        'We run your channels like a newsroom. Sharp content calendars, trend-aware copy, and reels that travel — built around what your audience actually opens.',
      tags: ['Reels', 'Calendar', 'Copy', 'Community'],
      bullets: [
        'Monthly editorial calendar tied to brand goals',
        'Daily community management & DM triage',
        'Native short-form for TikTok, IG, YouTube Shorts',
        'Weekly performance reads — what to double down on'
      ]
    },
    {
      number: '/02',
      title: 'Strategy',
      tagline: 'A plan that survives contact with the algorithm.',
      description:
        'No spray-and-pray. We map audiences, audit competitors, and define the angles that move the needle — then translate it into a roadmap your team can run with.',
      tags: ['Audit', 'Positioning', 'Roadmap'],
      bullets: [
        'Audience research & persona deep-dives',
        'Competitor & cultural landscape audit',
        'Channel-by-channel content strategy',
        'KPIs that mean something (not just vanity metrics)'
      ]
    },
    {
      number: '/03',
      title: 'Creative production',
      tagline: 'Concepts shot, edited, and on-feed by Friday.',
      description:
        'Photo, video, motion design — produced in-house with a sharp visual language. From single-frame stills to multi-day shoots, we make assets that look like they belong somewhere worth following.',
      tags: ['Photo', 'Video', 'Motion'],
      bullets: [
        'Full pre-production: concept, casting, locations',
        'On-set direction with a creative team that gets the brief',
        'Edit & post — color, sound design, motion',
        'Variants tailored per platform & format'
      ]
    },
    {
      number: '/04',
      title: 'Influencer & creator',
      tagline: 'The right voice. The right reach. No drama.',
      description:
        'We connect brands with creators who actually align — not just with follower counts, but with audience trust. Briefs that respect the creator, contracts that protect the brand.',
      tags: ['Sourcing', 'Contracts', 'Campaigns'],
      bullets: [
        'Creator sourcing across niches & micro-influencers',
        'Brief writing that leaves room for creator voice',
        'End-to-end campaign management',
        'Performance reporting & ROI breakdown'
      ]
    },
    {
      number: '/05',
      title: 'UGC content',
      tagline: 'Authentic-feel content that converts.',
      description:
        'Performance-grade UGC, scripted and produced for paid social. Hooks tested, formats iterated, results measured. The kind of content that actually gets the click.',
      tags: ['Hooks', 'Iteration', 'Paid social'],
      bullets: [
        'Hook frameworks proven across verticals',
        'Concept variations for A/B testing',
        'Native-feel production at scale',
        'Continuous iteration based on ad data'
      ]
    },
    {
      number: '/06',
      title: 'Brand training',
      tagline: 'We teach your team to fish.',
      description:
        'Workshops and bootcamps that turn internal teams into capable in-house creators — covering strategy, content production, platform mechanics, and measurement.',
      tags: ['Workshop', 'In-house', 'Coaching'],
      bullets: [
        'Custom curricula built around your team gaps',
        'Hands-on production training (not just theory)',
        'Tooling, workflow & approval process design',
        'Ongoing coaching as your team grows'
      ]
    }
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Reveal-on-scroll observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    document
      .querySelectorAll('.services .reveal, .services .reveal-stagger')
      .forEach((el) => this.observer!.observe(el));
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  onEnter(i: number): void {
    if (!this.clickLocked) {
      this.activeIndex = i;
    }
  }

  onLeave(): void {
    /* hover only previews when no click lock; nothing else needed */
  }

  toggle(i: number): void {
    if (this.activeIndex === i && this.clickLocked) {
      this.activeIndex = -1;
      this.clickLocked = false;
    } else {
      this.activeIndex = i;
      this.clickLocked = true;
    }
  }
}
