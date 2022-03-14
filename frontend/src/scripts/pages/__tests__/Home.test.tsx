/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import Home from 'scripts/pages/Home';
import { render } from '@testing-library/react';

describe('pages/Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<Home locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
