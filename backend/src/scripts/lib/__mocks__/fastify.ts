/**
 * Fastify mock.
 */
const addHook = jest.fn((_event, callback) => callback({
  method: 'OPTIONS',
}, {
  header: jest.fn(),
  status: jest.fn(() => ({ send: jest.fn() })),
}, null, jest.fn()));

const register = jest.fn((callback) => callback({
  post: jest.fn(),
  get: jest.fn(),
  head: jest.fn(),
}, null, jest.fn()));

const listen = jest.fn((_a, _b, callback) => callback(
  (process.env.ENV === 'production')
    ? 'error'
    : undefined,
));

const fastify = jest.fn(() => ({
  addHook,
  register,
  get: jest.fn(),
  listen,
  log: { fatal: jest.fn() },
  setErrorHandler: jest.fn(),
  setNotFoundHandler: jest.fn(),
  addContentTypeParser: jest.fn(),
}));

export {
  fastify,
  addHook,
  register,
  listen,
};
export default fastify;
