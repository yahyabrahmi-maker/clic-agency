import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  year = new Date().getFullYear();
  newsletterEmail = '';
  subscribed = false;

  onSubscribe(e: Event): void {
    e.preventDefault();
    if (!this.newsletterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.newsletterEmail)) return;

    // Simulated — replace with real backend in production
    console.log('Newsletter signup:', this.newsletterEmail);
    this.subscribed = true;
    this.newsletterEmail = '';

    setTimeout(() => { this.subscribed = false; }, 4000);
  }
}
