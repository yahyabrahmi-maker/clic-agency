import {
  AfterViewInit,
  Component,
  NgZone,
  OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements AfterViewInit, OnDestroy {

  // ---------- Form state ----------
  form: ContactForm = { name: '', email: '', message: '' };
  errors: Record<string, string> = {};
  submitting = false;
  sent = false;

  // ---------- Service & budget chips ----------
  serviceOptions: string[] = [
    'Social media',
    'Strategy',
    'Creative production',
    'Influencer',
    'UGC',
    'Brand training'
  ];
  selectedServices: string[] = [];

  budgetOptions: string[] = [
    '< 5k',
    '5–15k',
    '15–40k',
    '40k+',
    'Not sure yet'
  ];
  selectedBudget = '';

  // ---------- Live local time ----------
  tunisTime = '';
  private clockId: number | null = null;
  private observer?: IntersectionObserver;

  constructor(private zone: NgZone) {}

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return;

    // Reveal-on-scroll
    this.observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          this.observer?.unobserve(e.target);
        }
      }),
      { threshold: 0.15 }
    );
    document.querySelectorAll('.contact .reveal').forEach((el) => this.observer!.observe(el));

    // Tunis clock — outside Angular zone, only triggers CD on tick (1Hz acceptable)
    this.updateClock();
    this.zone.runOutsideAngular(() => {
      this.clockId = window.setInterval(() => {
        this.zone.run(() => this.updateClock());
      }, 1000);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    if (this.clockId !== null) clearInterval(this.clockId);
  }

  // ---------- Chips ----------
  toggleService(opt: string): void {
    const i = this.selectedServices.indexOf(opt);
    if (i >= 0) {
      this.selectedServices.splice(i, 1);
    } else {
      this.selectedServices.push(opt);
    }
  }

  // ---------- Validation ----------
  validate(field: keyof ContactForm): boolean {
    const v = (this.form[field] || '').trim();
    delete this.errors[field];

    if (field === 'name' && v.length < 2) {
      this.errors['name'] = 'A name, even a nickname, helps.';
      return false;
    }
    if (field === 'email') {
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      if (!ok) {
        this.errors['email'] = 'That email looks off — try again?';
        return false;
      }
    }
    if (field === 'message' && v.length < 10) {
      this.errors['message'] = 'Tell us a bit more — even a sentence works.';
      return false;
    }
    return true;
  }

  validateAll(): boolean {
    const fields: (keyof ContactForm)[] = ['name', 'email', 'message'];
    let ok = true;
    fields.forEach((f) => {
      if (!this.validate(f)) ok = false;
    });
    return ok;
  }

  // ---------- Submit ----------
  onSubmit(e: Event): void {
    e.preventDefault();
    if (this.submitting || this.sent) return;
    if (!this.validateAll()) return;

    this.submitting = true;

    // Simulated send — replace with real backend / API call
    setTimeout(() => {
      this.submitting = false;
      this.sent = true;

      // In a real project: fetch('/api/contact', { method: 'POST', body: JSON.stringify({...}) })
      console.log('CLIC — contact submission', {
        ...this.form,
        services: this.selectedServices,
        budget: this.selectedBudget
      });

      // Reset success state after a moment so the user can send another
      setTimeout(() => {
        this.sent = false;
        this.form = { name: '', email: '', message: '' };
        this.selectedServices = [];
        this.selectedBudget = '';
      }, 4000);
    }, 1400);
  }

  // ---------- Clock ----------
  private updateClock(): void {
    const now = new Date();
    // Africa/Tunis (UTC+1, no DST)
    this.tunisTime = now.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Tunis'
    });
  }
}
