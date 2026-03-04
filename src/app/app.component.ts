import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <header class="site-header">
      <div class="header-inner">
        <div class="brand">
          <span class="brand-mark">—</span>
          <span class="brand-name">Library</span>
        </div>
        <nav class="site-nav">
          <a routerLink="/books" class="nav-link">Collection</a>
          <a routerLink="/books/add" class="nav-cta">Add Book</a>
        </nav>
      </div>
    </header>
    <main class="site-main">
      <router-outlet />
    </main>
    <footer class="site-footer">
      <span>Books Collection</span>
    </footer>
  `,
  styles: [`
    :host {
      --ink: #1a1a1a;
      --ink-soft: #6b6b6b;
      --ink-faint: #b0b0b0;
      --paper: #faf9f7;
      --paper-alt: #f3f1ee;
      --border: #e2dfd9;
      --accent: #c0392b;
      --accent-soft: #f9f0ef;
      font-family: 'Georgia', 'Times New Roman', serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    .site-header {
      background: var(--paper);
      border-bottom: 1px solid var(--border);
      position: sticky; top: 0; z-index: 100;
    }
    .header-inner {
      max-width: 960px; margin: 0 auto;
      padding: 20px 32px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .brand { display: flex; align-items: center; gap: 10px; }
    .brand-mark { color: var(--accent); font-size: 1.4rem; font-weight: 300; }
    .brand-name {
      font-size: 1.1rem; letter-spacing: 0.18em;
      text-transform: uppercase; color: var(--ink);
      font-family: 'Georgia', serif; font-weight: normal;
    }
    .site-nav { display: flex; align-items: center; gap: 28px; }
    .nav-link {
      color: var(--ink-soft); text-decoration: none;
      font-size: 0.85rem; letter-spacing: 0.12em;
      text-transform: uppercase;
      transition: color 0.2s;
    }
    .nav-link:hover { color: var(--ink); }
    .nav-cta {
      color: var(--ink); text-decoration: none;
      font-size: 0.8rem; letter-spacing: 0.14em;
      text-transform: uppercase;
      border: 1px solid var(--ink);
      padding: 8px 18px;
      transition: all 0.2s;
    }
    .nav-cta:hover {
      background: var(--ink); color: var(--paper);
    }
    .site-main {
      max-width: 960px; margin: 0 auto;
      padding: 56px 32px;
      min-height: calc(100vh - 130px);
      background: var(--paper);
    }
    .site-footer {
      text-align: center;
      padding: 24px;
      color: var(--ink-faint);
      font-size: 0.75rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      border-top: 1px solid var(--border);
      background: var(--paper);
    }
  `]
})
export class AppComponent { title = 'mean-crud'; }
