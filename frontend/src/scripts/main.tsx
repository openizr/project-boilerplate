import 'styles/main.scss';
import monitoring from 'scripts/services/monitoring';
import i18n from 'basx/i18n';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from 'scripts/containers/Router';

const { log } = console;

if (process.env.ENV === 'production') {
  log('PRODUCTION MODE');
}
if (process.env.ENV === 'development') {
  log('DEVELOPMENT MODE');
}

i18n();

function main(): void {
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.querySelector('#root'),
  );
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
// processing, by manually unmounting React components tree.
window.addEventListener('beforeunload', () => {
  ReactDOM.unmountComponentAtNode(document.querySelector('#root') as Element);
});
