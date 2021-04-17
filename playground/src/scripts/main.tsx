import sum from 'library';

// Webpack HMR interface.
interface ExtendedNodeModule extends NodeModule {
  hot: { accept: () => void };
}

function main(): void {
  console.log(sum(1, 2, 3, 4, 5)); // eslint-disable-line no-console
}

// Ensures DOM is fully loaded before running app's main logic.
// Loading hasn't finished yet...
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', main);
  // `DOMContentLoaded` has already fired...
} else {
  main();
}

// Enables Hot Module Rendering.
if ((module as ExtendedNodeModule).hot) {
  (module as ExtendedNodeModule).hot.accept();
}
