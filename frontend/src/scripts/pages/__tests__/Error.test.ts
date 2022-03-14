/**
 * @jest-environment jsdom
 */

import Error from 'scripts/pages/Error.svelte';
import { render } from '@testing-library/svelte';

describe('pages/Error', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(Error, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
