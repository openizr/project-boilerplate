/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import Router from 'scripts/containers/Router';
import { act, render } from '@testing-library/react';

// Useful mocks allowing us to easily test React lazy components and Suspense.
jest.mock('react', () => {
  const MockedReact = jest.requireActual('react');
  MockedReact.Suspense = ({ children, fallback }: Any): Any => (
    process.env.LOADING === 'true' ? fallback : children
  );
  MockedReact.lazy = (callback: Any): Any => callback();
  return MockedReact;
});

jest.mock('scripts/store/routes', () => ({
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  '/': (): Any => require('scripts/pages/Home').default,
}));

jest.mock('scripts/locale/index', () => jest.fn(() => Promise.resolve({ LABEL_TEST: 'Test' })));

jest.mock('scripts/store/index', () => ({
  mutate: jest.fn(),
  dispatch: jest.fn(),
  useCombiner: jest.fn((_hash, callback = (state: Any): Any => state) => callback({ route: (process.env.NOT_FOUND === 'true' ? null : '/') })),
}));

describe('containers/Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.LOADING;
    delete process.env.NOT_FOUND;
  });

  test('renders correctly - loading page', async () => {
    process.env.LOADING = 'true';
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      container = render(<Router />).container;
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - found page', async () => {
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      container = render(<Router />).container;
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - not found page', async () => {
    process.env.NOT_FOUND = 'true';
    let container: HTMLElement = document.createElement('div');
    await act(async () => {
      container = render(<Router />).container;
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
