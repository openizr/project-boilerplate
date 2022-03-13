/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import AppMessage from 'scripts/components/AppMessage.vue';

describe('components/AppMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(AppMessage, { props: { label: 'test' } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
