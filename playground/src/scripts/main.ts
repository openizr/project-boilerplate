import sum from 'library';

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
