/**
 * @jest-environment jsdom
 */

/* eslint-disable global-require */

jest.mock('diox', () => jest.fn());
jest.mock('basx/i18n', () => jest.fn());
jest.mock('scripts/containers/Router', () => function Router(): null {
  return null;
});
Object.assign(console, { log: jest.fn() });

const { log } = console;

describe('scripts/main', () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  document.querySelector = jest.fn(() => div);

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.ENV = 'test';
  });

  test('initializes application - development mode', () => {
    jest.isolateModules(() => {
      process.env.ENV = 'development';
      require('scripts/main');
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith('DEVELOPMENT MODE');
    });
  });

  test('initializes application - production mode', () => {
    jest.isolateModules(() => {
      Object.defineProperty(document, 'readyState', {
        get() {
          return 'loading';
        },
      });
      window.addEventListener = jest.fn((event, callback) => {
        if (event === 'beforeunload') {
          (callback as unknown as () => void)();
        }
      });
      process.env.ENV = 'production';
      require('scripts/main');
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith('PRODUCTION MODE');
    });
  });
});
