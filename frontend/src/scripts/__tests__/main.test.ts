/**
 * @jest-environment jsdom
 */

/* eslint-disable global-require */

jest.mock('diox', () => jest.fn());
jest.mock('basx/i18n', () => jest.fn());
Object.assign(console, { log: jest.fn(), error: jest.fn() });
jest.mock('scripts/containers/AppRouter.vue', () => function AppRouter(): null {
  return null;
});

describe('scripts/main', () => {
  const { log, error } = console;
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

  test('initializes application - production mode', (done) => {
    jest.isolateModules(async () => {
      const register = jest.fn(() => {
        throw new Error('');
      });
      Object.defineProperty(document, 'readyState', {
        get() {
          return 'loading';
        },
      });
      Object.defineProperty(navigator, 'serviceWorker', {
        get() {
          return { register };
        },
      });
      window.addEventListener = jest.fn((event, callback) => {
        if (event === 'beforeunload' || event === 'load' || event === 'unhandledrejection') {
          (callback as Any)({ reason: {} });
        }
      });
      process.env.ENV = 'production';
      try {
        require('scripts/main');
      } catch (e) {
        // No-op.
      }
      (window.onerror as Any)('window error', null, null, null);
      (window.onerror as Any)('window error 2', null, null, null, new Error());
      expect(log).toHaveBeenCalledTimes(1);
      expect(log).toHaveBeenCalledWith('PRODUCTION MODE');
      expect(error).toHaveBeenCalledTimes(4);
      expect(error).toHaveBeenCalledWith('Error', {
        level: 'error',
        from: 'frontend',
        environment: 'production',
        message: '',
        stack: expect.any(String),
      });
      expect(error).toHaveBeenCalledWith('Error', {
        level: 'fatal',
        from: 'frontend',
        environment: 'production',
      });
      expect(error).toHaveBeenCalledWith('Error', {
        level: 'fatal',
        from: 'frontend',
        environment: 'production',
        message: 'window error',
      });
      expect(error).toHaveBeenCalledWith('Error', {
        level: 'fatal',
        from: 'frontend',
        environment: 'production',
        message: 'window error 2',
        stack: expect.any(String),
      });
      expect(register).toHaveBeenCalledTimes(1);
      expect(register).toHaveBeenCalledWith('/serviceWorker.js');
      done();
    });
  });
});
