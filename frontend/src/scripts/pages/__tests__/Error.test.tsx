/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import Error from 'scripts/pages/Error';
import { render } from '@testing-library/react';

describe('pages/Error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(<Error locale={{ LABEL_TEST: 'Test' }} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
