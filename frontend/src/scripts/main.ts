import 'styles/main.scss';
import i18n from 'basx/i18n';
import { App, createApp } from 'vue';
import AppRouter from 'scripts/containers/AppRouter.vue';

let app: App;
const { log } = console;

if (process.env.ENV === 'production') {
  log('PRODUCTION MODE');
}
if (process.env.ENV === 'development') {
  log('DEVELOPMENT MODE');
}

async function main(): Promise<void> {
  i18n();
  const locale = await import('scripts/locale/en.json');
  app = createApp(AppRouter, {
    locale: locale.default,
  });
  app.mount('#root');
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Ensures subscriptions to Store are correctly cleared when page is left, to prevent "ghost"
// processing, by manually unmounting React components tree.
window.addEventListener('beforeunload', () => {
  app.unmount();
});
