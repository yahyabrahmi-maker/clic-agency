import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface NavLink { label: string; href: string; }

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  scrolled = false;
  menuOpen = false;

  links: NavLink[] = [
    { label: 'Services', href: '#services' },
    { label: 'Work',     href: '#work' },
    { label: 'Clients',  href: '#clients' },
    { label: 'About',    href: '#about' },
    { label: 'Contact',  href: '#contact' }
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 40;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }
}
