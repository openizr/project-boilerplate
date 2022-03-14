/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Router from 'scripts/containers/Router.svelte';

jest.mock('scripts/store/routes', () => ({
  default: {
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    '/': (): Any => Promise.resolve(require('scripts/pages/Home.svelte')),
  },
}));

jest.mock('scripts/locale/index', () => ({ default: jest.fn(() => Promise.resolve({ LABEL_TEST: 'Test' })) }));

jest.mock('scripts/store/index', () => ({
  mutate: jest.fn(),
  dispatch: jest.fn(),
  useCombiner: jest.fn(() => ({
    subscribe: (callback: Any): Any => {
      callback({ route: (process.env.NOT_FOUND === 'true' ? null : '/') });
      return jest.fn();
    },
  })),
}));

describe('containers/Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.LOADING;
    delete process.env.NOT_FOUND;
  });

  test('renders correctly - loading page', () => {
    const { container } = render(Router);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page found', async () => {
    const { container } = render(Router);
    await new Promise((resolve) => { setTimeout(resolve); });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page not found', async () => {
    process.env.NOT_FOUND = 'true';
    const { container } = render(Router);
    await new Promise((resolve) => { setTimeout(resolve); });
    expect(container.firstChild).toMatchSnapshot();
  });
});
