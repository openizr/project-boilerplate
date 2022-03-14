/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Home from 'scripts/pages/Home.svelte';

describe('pages/Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(Home, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
