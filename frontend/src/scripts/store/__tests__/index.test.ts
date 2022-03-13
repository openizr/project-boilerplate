/**
 * @jest-environment jsdom
 */

import store from 'scripts/store/index';
import routes from 'scripts/store/routes';

jest.mock('diox');
jest.mock('diox/connectors/vue', () => jest.fn());
jest.mock('diox/extensions/router', () => jest.fn());

describe('scripts/store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('correctly export store data', () => {
    expect(store).not.toBe(undefined);
    expect(routes['/']()).not.toBe(undefined);
  });
});
