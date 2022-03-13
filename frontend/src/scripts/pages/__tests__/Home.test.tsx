/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import Home from 'scripts/pages/Home';
import { act } from 'react-dom/test-utils';
import { render, unmountComponentAtNode } from 'react-dom';

let container = document.createElement('div');

describe('react/Home', () => {
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
      render(<Home locale={{ LABEL_TEST: 'Test' }} />, container);
    });
    expect(container).toMatchSnapshot();
  });
});
