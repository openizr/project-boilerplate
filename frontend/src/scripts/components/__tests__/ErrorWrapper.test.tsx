/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render } from '@testing-library/react';
import ErrorWrapper from 'scripts/components/ErrorWrapper';

describe('components/ErrorWrapper', () => {
  Object.assign(console, { error: jest.fn() });
  const { error } = console;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(
      <ErrorWrapper fallback={<div>error</div>}>
        <div>success</div>
      </ErrorWrapper>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders correctly - error, no handler', () => {
    const ErrorComponent = (): JSX.Element => {
      throw new Error();
    };
    const { container } = render(
      <ErrorWrapper fallback={<div>error</div>}>
        <ErrorComponent />
      </ErrorWrapper>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(error).toHaveBeenCalledTimes(2);
  });

  test('renders correctly - error, handler', () => {
    const onError = jest.fn();
    const ErrorComponent = (): JSX.Element => {
      throw new Error();
    };
    const { container } = render(
      <ErrorWrapper fallback={<div>error</div>} onError={onError}>
        <ErrorComponent />
      </ErrorWrapper>,
    );
    expect(container.firstChild).toMatchSnapshot();
    expect(error).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error(), {
      componentStack: '\n    at ErrorComponent (/var/www/html/src/scripts/components/__tests__/ErrorWrapper.test.tsx:42:13)\n    at ErrorWrapper (/var/www/html/src/scripts/components/ErrorWrapper.tsx:33:5)',
    });
  });
});
