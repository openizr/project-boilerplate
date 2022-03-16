import 'styles/main.scss';
import monitoring from 'scripts/services/monitoring';
import i18n from 'basx/i18n';
import type { SvelteComponent } from 'svelte';
import Router from 'scripts/containers/Router.svelte';

const { log } = console;

let app: SvelteComponent;

if (process.env.ENV === 'production') {
  log('PRODUCTION MODE');
}
if (process.env.ENV === 'development') {
  log('DEVELOPMENT MODE');
}

i18n();

async function main(): Promise<void> {
  const target = document.querySelector('#root') as HTMLElement;
  target.innerHTML = '';
  app = new Router({
    hydrate: false,
    target,
  });
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Registers service worker if necessary.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register('/serviceWorker.js');
    } catch (error) {
      monitoring.captureError('error', error as Error);
    }
  });
}

// Ensures subscriptions to Store are correctly cleared when page is left, to prevent "ghost"
// processing, by manually unmounting Svelte components tree.
window.addEventListener('beforeunload', () => {
  app.$destroy();
});
