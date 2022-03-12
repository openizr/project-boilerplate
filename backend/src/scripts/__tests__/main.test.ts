/* eslint-disable global-require */

import cacheClient from 'scripts/conf/services';
import * as fastify from 'scripts/__mocks__/fastify';

jest.spyOn(process, 'exit').mockImplementation((code: number | undefined) => code as unknown as never);

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
      jest.doMock('fastify', () => fastify.fastify);
      require('scripts/main');
      expect(cacheClient).not.toBe(undefined);
      expect(fastify.fastify).toHaveBeenCalledTimes(1);
      expect(fastify.fastify).toHaveBeenCalledWith({
        connectionTimeout: 3000,
        ignoreTrailingSlash: true,
        keepAliveTimeout: 2000,
        trustProxy: '127.0.0.1/32',
        logger: {
          level: 'info',
          prettyPrint: {
            colorize: true,
            ignore: 'hostname,pid',
            suppressFlushSyncWarning: true,
            translateTime: 'HH:MM:ss',
          },
        },
      });
      expect(fastify.register).toHaveBeenCalledTimes(1);
      expect(fastify.addHook).toHaveBeenCalledTimes(2);
      expect(fastify.addHook).toHaveBeenCalledWith('onRequest', expect.any(Function));
      expect(fastify.addHook).toHaveBeenCalledWith('onTimeout', expect.any(Function));
      expect(fastify.listen).toHaveBeenCalledTimes(1);
      expect(fastify.listen).toHaveBeenCalledWith(9000, '0.0.0.0', expect.any(Function));
    });
  });

  test('correctly initializes server - development mode 2', () => {
    process.env.FASTIFY_REQUEST_TYPE = 'GET';
    process.env.FASTIFY_CONTENT_TYPE = 'application/json';
    delete process.env.BACKEND_PORT;
    process.env.ENV = 'development';
    jest.isolateModules(() => {
      require('scripts/main');
      expect(fastify.fastify).toHaveBeenCalledTimes(1);
      expect(fastify.fastify).toHaveBeenCalledWith({
        connectionTimeout: 3000,
        ignoreTrailingSlash: true,
        trustProxy: '127.0.0.1/32',
        keepAliveTimeout: 2000,
        logger: {
          level: 'info',
          prettyPrint: {
            colorize: true,
            ignore: 'hostname,pid',
            suppressFlushSyncWarning: true,
            translateTime: 'HH:MM:ss',
          },
        },
      });
      expect(fastify.register).toHaveBeenCalledTimes(1);
      expect(fastify.addHook).toHaveBeenCalledTimes(2);
      expect(fastify.addHook).toHaveBeenCalledWith('onRequest', expect.any(Function));
      expect(fastify.addHook).toHaveBeenCalledWith('onTimeout', expect.any(Function));
      expect(fastify.listen).toHaveBeenCalledTimes(1);
      expect(fastify.listen).toHaveBeenCalledWith(9000, '0.0.0.0', expect.any(Function));
      delete process.env.FASTIFY_REQUEST_TYPE;
      delete process.env.FASTIFY_CONTENT_TYPE;
    });
  });

  test('correctly initializes server - production mode', () => {
    process.env.ENV = 'production';
    jest.isolateModules(() => {
      require('scripts/main');
      expect(fastify.fastify).toHaveBeenCalledTimes(1);
      expect(fastify.fastify).toHaveBeenCalledWith({
        connectionTimeout: 3000,
        ignoreTrailingSlash: true,
        trustProxy: '127.0.0.1/32',
        keepAliveTimeout: 2000,
        logger: { level: 'error', prettyPrint: false },
      });
      expect(fastify.register).toHaveBeenCalledTimes(1);
      expect(fastify.addHook).toHaveBeenCalledTimes(1);
      expect(fastify.addHook).toHaveBeenCalledWith('onTimeout', expect.any(Function));
      expect(fastify.listen).toHaveBeenCalledTimes(1);
      expect(fastify.listen).toHaveBeenCalledWith(4000, '0.0.0.0', expect.any(Function));
    });
  });
});
