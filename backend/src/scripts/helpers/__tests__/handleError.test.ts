import {
  Gone,
  NotFound,
  Conflict,
  Forbidden,
  BadRequest,
  Unauthorized,
  NotAcceptable,
  TooManyRequests,
  UnprocessableEntity,
  RequestEntityTooLarge,
} from 'scripts/lib/errors';
import handleError from 'scripts/helpers/handleError';
import { FastifyRequest, FastifyReply, FastifyError } from 'fastify';

describe('helpers/handleError', () => {
  const send = jest.fn();
  const logError = jest.fn();
  const status = jest.fn(() => ({ send }));
  const response = <FastifyReply>({ status } as unknown);
  const request = <FastifyRequest>({ log: { error: logError }, headers: {} } as unknown);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('HTTP 400', async () => {
    const error = <FastifyError>(new BadRequest('bad_request', 'Bad Request.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'bad_request', message: 'Bad Request.' } });
    expect(status).toHaveBeenCalledWith(400);
  });

  test('HTTP 401', async () => {
    const error = <FastifyError>(new Unauthorized('unauthorized', 'Unauthorized.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'unauthorized', message: 'Unauthorized.' } });
    expect(status).toHaveBeenCalledWith(401);
  });

  test('HTTP 403', async () => {
    const error = <FastifyError>(new Forbidden('forbidden', 'Forbidden.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'forbidden', message: 'Forbidden.' } });
    expect(status).toHaveBeenCalledWith(403);
  });

  test('HTTP 404', async () => {
    const error = <FastifyError>(new NotFound('not_found', 'Not Found.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'not_found', message: 'Not Found.' } });
    expect(status).toHaveBeenCalledWith(404);
  });

  test('HTTP 406', async () => {
    const error = <FastifyError>(new NotAcceptable('not_acceptable', 'Not Acceptable.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'not_acceptable', message: 'Not Acceptable.' } });
    expect(status).toHaveBeenCalledWith(406);
  });

  test('HTTP 409', async () => {
    const error = <FastifyError>(new Conflict('conflict', 'Conflict.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'conflict', message: 'Conflict.' } });
    expect(status).toHaveBeenCalledWith(409);
  });

  test('HTTP 410', async () => {
    const error = <FastifyError>(new Gone('gone', 'Gone.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'gone', message: 'Gone.' } });
    expect(status).toHaveBeenCalledWith(410);
  });

  test('HTTP 413', async () => {
    const error = <FastifyError>(new RequestEntityTooLarge('too_large', 'Too large.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'too_large', message: 'Too large.' } });
    expect(status).toHaveBeenCalledWith(413);
  });

  test('HTTP 422', async () => {
    const error = <FastifyError>(new UnprocessableEntity('unprocessable_entity', 'Unprocessable Entity.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'unprocessable_entity', message: 'Unprocessable Entity.' } });
    expect(status).toHaveBeenCalledWith(422);
  });

  test('HTTP 429', async () => {
    const error = <FastifyError>(new TooManyRequests('too_many_requests', 'Too Many Requests.'));
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'too_many_requests', message: 'Too Many Requests.' } });
    expect(status).toHaveBeenCalledWith(429);
  });

  test('JSON error', async () => {
    const error = <FastifyError>{ statusCode: 400 };
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'invalid_payload', message: 'Invalid JSON payload.' } });
    expect(status).toHaveBeenCalledWith(400);
  });

  test('Validation error', async () => {
    const error = <FastifyError>{ message: 'Body must be a valid JSON.', code: 'invalid_payload', validation: [{}] };
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'invalid_payload', message: 'Body must be a valid JSON.' } });
    expect(status).toHaveBeenCalledWith(400);
  });

  test('HTTP 500', async () => {
    const error = <FastifyError>(new Error());
    await handleError(error, request, response);
    expect(send).toHaveBeenCalledWith({ error: { code: 'internal_server_error', message: 'Internal Server Error.' } });
    expect(status).toHaveBeenCalledWith(500);
    expect(request.log.error).toHaveBeenCalledWith(error);
  });
});
