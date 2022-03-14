/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/svelte';
import Message from 'scripts/components/Message.svelte';

describe('components/AppMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(Message, { props: { label: 'test' } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
