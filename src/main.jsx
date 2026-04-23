// ============================================
// main.jsx — Application entry point
// Place this file in: src/main.jsx
// ============================================
import { render } from 'solid-js/web';
import App from './App.jsx';

// ─── Render SolidJS app ───────────────────────────────────────────────────────
const root = document.getElementById('root');
render(() => <App />, root);

// ─── Register Service Worker ──────────────────────────────────────────────────
// Only registers in production-like environments.
// Service workers require HTTPS or localhost to work.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('[SW] Registered successfully. Scope:', registration.scope);
      })
      .catch((error) => {
        console.error('[SW] Registration failed:', error);
      });
  });
}
