/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/vue';
import ErrorPage from 'scripts/pages/ErrorPage.vue';

describe('pages/ErrorPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly - basic', () => {
    const { container } = render(ErrorPage, { props: { locale: { LABEL_TEST: 'Test' } } });
    expect(container.firstChild).toMatchSnapshot();
  });
});
