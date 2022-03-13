/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import Router from 'scripts/containers/Router';
import { render } from '@testing-library/react';

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

jest.mock('scripts/store/index', () => ({
  mutate: jest.fn(),
  dispatch: jest.fn(),
  useCombiner: jest.fn((_hash, callback) => callback({ route: (process.env.NOT_FOUND === 'true' ? null : '/') })),
}));

describe('react/Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    delete process.env.LOADING;
    delete process.env.NOT_FOUND;
  });

  test('renders correctly - loading page', () => {
    process.env.LOADING = 'true';
    const { container } = render(<Router locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - found page', () => {
    const { container } = render(<Router locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - not found page', () => {
    process.env.NOT_FOUND = 'true';
    const { container } = render(<Router locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
