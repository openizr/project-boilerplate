import {
  Gone,
  NotFound,
  Forbidden,
  BadRequest,
  Unauthorized,
  NotAcceptable,
  TooManyRequests,
  UnprocessableEntity,
} from 'scripts/lib/errors';
import handleError from 'scripts/helpers/handleError';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';

const send = jest.fn();
const logError = jest.fn();
const request = { log: { error: logError } } as unknown as FastifyRequest;
const status = jest.fn(() => ({ send }));
const response = { status } as unknown as FastifyReply;
console.error = jest.fn(); // eslint-disable-line no-console
const consoleerror = console.error; // eslint-disable-line no-console

describe('helpers/handleError', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('HTTP 400', async () => {
    const error = new BadRequest('bad_request', 'Bad Request.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'bad_request', message: 'Bad Request.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(400);
  });

  test('HTTP 401', async () => {
    const error = new Unauthorized('unauthorized', 'Unauthorized.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'unauthorized', message: 'Unauthorized.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(401);
  });

  test('HTTP 403', async () => {
    const error = new Forbidden('forbidden', 'Forbidden.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'forbidden', message: 'Forbidden.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(403);
  });

  test('HTTP 404', async () => {
    const error = new NotFound('not_found', 'Not Found.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'not_found', message: 'Not Found.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(404);
  });

  test('HTTP 406', async () => {
    const error = new NotAcceptable('not_acceptable', 'Not Acceptable.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'not_acceptable', message: 'Not Acceptable.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(406);
  });

  test('HTTP 410', async () => {
    const error = new Gone('gone', 'Gone.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'gone', message: 'Gone.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(410);
  });

  test('HTTP 422', async () => {
    const error = new UnprocessableEntity('unprocessable_entity', 'Unprocessable Entity.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'unprocessable_entity', message: 'Unprocessable Entity.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(422);
  });

  test('HTTP 429', async () => {
    const error = new TooManyRequests('too_many_requests', 'Too Many Requests.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'too_many_requests', message: 'Too Many Requests.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(429);
  });

  test('JSON error', async () => {
    const error = { statusCode: 400 } as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'invalid_payload', message: 'Invalid JSON payload.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(400);
  });

  test('Validation error', async () => {
    const error = { validation: [{ message: 'Validation error.' }] } as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'invalid_payload', message: 'Validation error.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(400);
  });

  test('Syntax error', async () => {
    const error = new SyntaxError('Syntax error.') as FastifyError;
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledTimes(1);
    expect(send).toHaveBeenCalledWith({ error: { code: 'internal_server_error', message: 'Internal Server Error.' } });
    expect(status).toHaveBeenCalledTimes(1);
    expect(status).toHaveBeenCalledWith(500);
    expect(consoleerror).toHaveBeenCalledTimes(1);
    expect(consoleerror).toHaveBeenCalledWith(error.stack);
  });

  test('Internal error - production mode', async () => {
    jest.resetModules();
    jest.setMock('scripts/conf/app', () => ({ mode: 'production' }));
    const modifiedHandleError = jest.requireActual('scripts/helpers/handleError').default;
    const error = new SyntaxError('Syntax error.');
    await modifiedHandleError(error, request, response);
    expect(consoleerror).not.toHaveBeenCalled();
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(error.stack);
  });
});
