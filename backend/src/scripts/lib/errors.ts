/** Contains standard HTTP exceptions. */

/* eslint-disable max-classes-per-file */
class HttpError extends Error {
  public code: string | number;

  constructor(code: string | number, message: string) {
    super(message);
    this.code = code;
  }
}

/**
 * HTTP 400 error.
 */
export class BadRequest extends HttpError { }

/**
 * HTTP 406 error.
 */
export class NotAcceptable extends HttpError { }

/**
 * HTTP 410 error.
 */
export class Gone extends HttpError { }

/**
 * HTTP 403 error.
 */
export class Forbidden extends HttpError { }

/**
 * HTTP 404 error.
 */
export class NotFound extends HttpError { }

/**
 * HTTP 429 error.
 */
export class TooManyRequests extends HttpError { }

/**
 * HTTP 413 error.
 */
export class RequestEntityTooLarge extends HttpError { }

/**
 * HTTP 422 error.
 */
export class UnprocessableEntity extends HttpError { }

/**
 * HTTP 401 error.
 */
export class Unauthorized extends HttpError { }

/**
 * HTTP 409 error.
 */
export class Conflict extends HttpError { }
