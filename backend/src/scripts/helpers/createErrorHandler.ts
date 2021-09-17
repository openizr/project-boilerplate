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
import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';

type ErrorHandler = (error: FastifyError, request: FastifyRequest, response: FastifyReply) => void;

/**
 * Creates a new Fastify error handler in given mode.
 *
 * @param {string} mode Handler mode.
 *
 * @returns {ErrorHandler} New error handler.
 */
export default function createErrorHandler(mode: string): ErrorHandler {
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
  return (error, request, response): void => {
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
      // In development mode, it is more convenient to get a clean, formatted trace of errors.
      if (mode === 'development') {
        const logger = console;
        logger.error(error.stack);
      } else {
        request.log.error(error.stack as string);
      }
    } else {
      errorCode = (error.validation !== undefined) ? 'invalid_payload' : error.code;
      message = (error.validation !== undefined) ? error.validation[0].message : error.message;
    }

    response
      .status(statusCode)
      .send({ error: { code: errorCode, message } });
  };
}
