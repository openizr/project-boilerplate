/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import NotFound from 'scripts/pages/NotFound.svelte';

describe('pages/NotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(NotFound, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
