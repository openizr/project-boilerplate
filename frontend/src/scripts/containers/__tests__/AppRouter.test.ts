/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import AppRouter from 'scripts/containers/AppRouter.vue';

jest.mock('scripts/store/routes', () => ({
  '/': (): Any => Promise.resolve(require('scripts/pages/HomePage.vue').default),
}));

jest.mock('scripts/store/index', () => ({
  mutate: jest.fn(),
  dispatch: jest.fn(),
  useCombiner: jest.fn((_hash, callback) => callback({ route: (process.env.NOT_FOUND === 'true' ? null : '/') })),
}));

describe('containers/AppRouter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - loading page', () => {
    const { container } = render(AppRouter, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page found', async () => {
    const { container } = render(AppRouter, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - page not found', async () => {
    process.env.NOT_FOUND = 'true';
    const { container } = render(AppRouter, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
