import * as fastify from 'fastify';

type Misc = any; // eslint-disable-line @typescript-eslint/no-explicit-any

jest.mock('ajv');
jest.mock('fastify');
jest.mock('ajv-errors');
jest.spyOn(process, 'exit').mockImplementation((code: number | undefined) => code as unknown as never);

const mockedFastify = fastify as Misc;

describe('main', () => {
  beforeEach(() => {
    process.env.BACKEND_PORT = '4000';
    process.env.ENV = 'test';
    jest.clearAllMocks();
  });

  test('correctly initializes server - development mode', () => {
    delete process.env.BACKEND_PORT;
    process.env.ENV = 'development';
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      require('scripts/main');
      expect(mockedFastify.fastify).toHaveBeenCalledTimes(1);
      expect(mockedFastify.fastify).toHaveBeenCalledWith({
        connectionTimeout: 3000,
        ignoreTrailingSlash: true,
        keepAliveTimeout: 2000,
        logger: { level: 'info' },
      });
      expect(mockedFastify.register).toHaveBeenCalledTimes(1);
      expect(mockedFastify.addHook).toHaveBeenCalledTimes(2);
      expect(mockedFastify.addHook).toHaveBeenCalledWith('onRequest', expect.any(Function));
      expect(mockedFastify.addHook).toHaveBeenCalledWith('onTimeout', expect.any(Function));
      expect(mockedFastify.listen).toHaveBeenCalledTimes(1);
      expect(mockedFastify.listen).toHaveBeenCalledWith(9000, '0.0.0.0', expect.any(Function));
    });
  });

  test('correctly initializes server - production mode', () => {
    process.env.ENV = 'production';
    jest.isolateModules(() => {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
      require('scripts/main');
      expect(mockedFastify.fastify).toHaveBeenCalledTimes(1);
      expect(mockedFastify.fastify).toHaveBeenCalledWith({
        connectionTimeout: 3000,
        ignoreTrailingSlash: true,
        keepAliveTimeout: 2000,
        logger: { level: 'error' },
      });
      expect(mockedFastify.register).toHaveBeenCalledTimes(1);
      expect(mockedFastify.addHook).toHaveBeenCalledTimes(1);
      expect(mockedFastify.addHook).toHaveBeenCalledWith('onTimeout', expect.any(Function));
      expect(mockedFastify.listen).toHaveBeenCalledTimes(1);
      expect(mockedFastify.listen).toHaveBeenCalledWith(4000, '0.0.0.0', expect.any(Function));
    });
  });
});
