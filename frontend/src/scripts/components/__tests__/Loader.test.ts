/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Loader from 'scripts/components/Loader.svelte';

describe('components/Loader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(Loader);
    expect(container.firstChild).toMatchSnapshot();
  });
});
