import React from 'react';
import { act } from 'react-dom/test-utils';
import ErrorWrapper from 'scripts/components/ErrorWrapper';
import { render, unmountComponentAtNode } from 'react-dom';

describe('components/ErrorWrapper', () => {
  console.error = jest.fn(); // eslint-disable-line no-console
  const { error } = console;
  let container = document.createElement('div');

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    jest.clearAllMocks();
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    ((container as unknown) as null) = null;
  });

  test('renders correctly - basic', () => {
    act(() => {
      render(
        <ErrorWrapper fallback={<div>error</div>}>
          <div>success</div>
        </ErrorWrapper>,
        container,
      );
    });
    expect(container).toMatchSnapshot();
  });

  test('renders correctly - error, no handler', () => {
    const ErrorComponent = (): JSX.Element => {
      throw new Error();
    };
    act(() => {
      render(
        <ErrorWrapper fallback={<div>error</div>}>
          <ErrorComponent />
        </ErrorWrapper>,
        container,
      );
    });
    expect(container).toMatchSnapshot();
    expect(error).toHaveBeenCalledTimes(2);
  });

  test('renders correctly - error, handler', () => {
    const onError = jest.fn();
    const ErrorComponent = (): JSX.Element => {
      throw new Error();
    };
    act(() => {
      render(
        <ErrorWrapper fallback={<div>error</div>} onError={onError}>
          <ErrorComponent />
        </ErrorWrapper>,
        container,
      );
    });
    expect(container).toMatchSnapshot();
    expect(error).toHaveBeenCalledTimes(2);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(new Error(), {
      componentStack: '\n    at ErrorComponent (/var/www/html/src/scripts/components/__tests__/ErrorWrapper.test.tsx:54:13)\n    at ErrorWrapper (/var/www/html/src/scripts/components/ErrorWrapper.tsx:34:5)',
    });
  });
});
