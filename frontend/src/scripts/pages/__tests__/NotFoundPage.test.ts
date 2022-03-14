/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import NotFoundPage from 'scripts/pages/NotFoundPage.vue';

describe('pages/NotFoundPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(NotFoundPage, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
