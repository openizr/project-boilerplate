interface Routes {
  [path: string]: () => Promise<unknown>;
}

export default {
  '/': () => import('scripts/pages/Home.svelte'),
} as Routes;
