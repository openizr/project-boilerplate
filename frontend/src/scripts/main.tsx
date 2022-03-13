import 'styles/main.scss';
import i18n from 'basx/i18n';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Router from 'scripts/containers/Router';
import ErrorWrapper from 'scripts/components/ErrorWrapper';

const { log } = console;

if (process.env.ENV === 'production') {
  log('PRODUCTION MODE');
}
if (process.env.ENV === 'development') {
  log('DEVELOPMENT MODE');
}

function main(): void {
  i18n();
  import('scripts/locale/en.json').then((locale) => {
    ReactDOM.render(
      <React.StrictMode>
        <ErrorWrapper fallback={<div>Error.</div>}>
          <Router locale={locale.default} />
        </ErrorWrapper>
      </React.StrictMode>,
      document.querySelector('#root'),
    );
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

// Ensures subscriptions to Store are correctly cleared when page is left, to prevent "ghost"
// processing, by manually unmounting React components tree.
window.addEventListener('beforeunload', () => {
  ReactDOM.unmountComponentAtNode(document.querySelector('#root') as Element);
});
