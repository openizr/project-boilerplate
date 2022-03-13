interface Routes {
  [path: string]: () => Promise<unknown>;
}

export default {
  '/': () => import('scripts/pages/Home'),
} as Routes;
