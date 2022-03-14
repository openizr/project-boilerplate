/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import AppRouter from 'scripts/containers/AppRouter.vue';

jest.mock('scripts/store/routes', () => ({
  '/': (): Any => (process.env.ERROR !== 'true'
    // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
    ? Promise.resolve(require('scripts/pages/HomePage.vue').default)
    : (): void => { throw new Error('error'); }),
}));

jest.mock('scripts/locale/index', () => jest.fn(() => Promise.resolve({ LABEL_TEST: 'Test' })));

jest.mock('scripts/store/index', () => ({
  mutate: jest.fn(),
  dispatch: jest.fn(),
  useCombiner: jest.fn((_hash, callback) => callback({ route: (process.env.NOT_FOUND === 'true' ? null : '/') })),
}));

describe('containers/AppRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.ERROR;
    delete process.env.LOADING;
    delete process.env.NOT_FOUND;
  });

  test('renders correctly - error', async () => {
    process.env.ERROR = 'true';
    Object.assign(console, { warn: jest.fn() });
    const { container } = render(AppRouter);
    await new Promise((resolve) => { setTimeout(resolve); });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - loading page', () => {
    const { container } = render(AppRouter);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page found', async () => {
    const { container } = render(AppRouter);
    await new Promise((resolve) => { setTimeout(resolve); });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page not found', async () => {
    process.env.NOT_FOUND = 'true';
    const { container } = render(AppRouter);
    await new Promise((resolve) => { setTimeout(resolve); });
    expect(container.firstChild).toMatchSnapshot();
  });
});
