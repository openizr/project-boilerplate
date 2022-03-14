/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import NotFound from 'scripts/pages/NotFound';
import { render } from '@testing-library/react';

describe('pages/NotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<NotFound locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
