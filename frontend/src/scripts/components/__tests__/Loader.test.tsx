/**
 * @jest-environment jsdom
 */

import React from 'react';
import Loader from 'scripts/components/Loader';
import { render } from '@testing-library/react';

describe('components/Loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
