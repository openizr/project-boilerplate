/** Contains standard HTTP exceptions. */

/* eslint-disable max-classes-per-file */
export class Forbidden extends Error { }
export class BadRequest extends Error { }
export class NotAcceptable extends Error { }
export class Gone extends Error { }
export class NotFound extends Error { }
export class TooManyRequests extends Error { }
export class RequestEntityTooLarge extends Error { }
export class UnprocessableEntity extends Error { }
export class Unauthorized extends Error { }
export class Conflict extends Error { }
