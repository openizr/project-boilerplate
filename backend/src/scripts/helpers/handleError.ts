import {
  Gone,
  Conflict,
  NotFound,
  Forbidden,
  BadRequest,
  Unauthorized,
  NotAcceptable,
  TooManyRequests,
  UnprocessableEntity,
  RequestEntityTooLarge,
} from 'scripts/lib/errors';
import { captureError } from 'scripts/helpers/monitoring';
import { FastifyError, FastifyRequest as Request, FastifyReply as Reply } from 'fastify';

/**
 * Handles thrown errors and formats a clean HTTP response.
 *
 * @param {FastifyError} error Error thrown by fastify.
 *
 * @param {FastifyRequest} request HTTP request.
 *
 * @param {FastifyReply} response HTTP response.
 *
 * @returns {void}
 */
export default function handleError(error: FastifyError, request: Request, response: Reply): void {
  let message = 'Internal Server Error.';
  let errorCode = 'internal_server_error';
  let statusCode = 500;

  if (error instanceof BadRequest) {
    statusCode = 400;
  } else if (error instanceof Unauthorized) {
    statusCode = 401;
  } else if (error instanceof Forbidden) {
    statusCode = 403;
  } else if (error instanceof NotFound) {
    statusCode = 404;
  } else if (error instanceof NotAcceptable) {
    statusCode = 406;
  } else if (error instanceof Conflict) {
    statusCode = 409;
  } else if (error instanceof Gone) {
    statusCode = 410;
  } else if (error instanceof UnprocessableEntity) {
    statusCode = 422;
  } else if (error instanceof RequestEntityTooLarge) {
    statusCode = 413;
  } else if (error instanceof TooManyRequests) {
    statusCode = 429;
  } else if (error.validation !== undefined) {
    statusCode = 400;
  }

  // Only HTTP 500 errors must be logged, and reason should not be displayed to end user.
  if (error.statusCode === 400) {
    statusCode = 400;
    errorCode = 'invalid_payload';
    message = 'Invalid JSON payload.';
  } else if (statusCode === 500) {
    request.log.error(error);
  } else {
    errorCode = error.code;
    message = error.message;
  }

  // Sending errors to the monitoring system...
  captureError((statusCode === 500) ? 'error' : 'info', 'TBD', {
    code: error.code,
    message: error.message,
    stack: <string>error.stack,
    statusCode,
    url: request.url,
    method: request.method,
    headers: Object.keys(request.headers),
  });

  response
    .status(statusCode)
    .send({ error: { code: errorCode, message } });
}
