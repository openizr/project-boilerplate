/**
 * Copyright (c) ...
 * All rights reserved.
 */

import { FastifyError, FastifyRequest, FastifyReply } from 'fastify';
import {
  Forbidden,
  BadRequest,
  NotAcceptable,
  Gone,
  NotFound,
  TooManyRequests,
  UnprocessableEntity,
  Unauthorized,
} from 'scripts/lib/exceptions';

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
export default function handleError(
  error: FastifyError,
  request: FastifyRequest,
  response: FastifyReply,
): void {
  let message = 'Internal Server Error';
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
  } else if (error instanceof Gone) {
    statusCode = 410;
  } else if (error instanceof UnprocessableEntity) {
    statusCode = 422;
  } else if (error instanceof TooManyRequests) {
    statusCode = 429;
  } else if (error.validation !== undefined) {
    statusCode = 400;
  } else if (error instanceof SyntaxError) {
    statusCode = 422;
  }

  // Only HTTP 500 errors must be logged, and reason should not be displayed to end user.
  if (statusCode === 500) {
    request.log.error(error.stack as string);
  } else {
    message = (error.validation !== undefined) ? error.validation[0].message : error.message;
  }

  response
    .status(statusCode)
    .send({ error: { code: statusCode, message } });
}
