export type ErrorLevel = 'info' | 'error' | 'fatal';

/**
 * Captures the given error in (pre)production modes.
 *
 * @param {ErrorLevel} level Error level.
 *
 * @param {string} distinctId Unique id used to (anonymously) identify user.
 *
 * @param {Error} error Error to capture.
 *
 * @returns {void}
 */
export const captureError = (level: ErrorLevel, distinctId: string, error: Any): void => {
  if (process.env.ENV !== 'development') {
    const logger = console;
    logger.error({
      distinctId,
      event: 'Error',
      properties: {
        level,
        from: 'TBD',
        ...(error as { [key: string]: Any; }),
        environment: process.env.ENV,
      },
    });
  }
};

/**
 * Only used internally to capture fatal errors.
 */
const captureFatalError = (error: Error): void => {
  // We always log the error in STDERR in case monitoring system cannot capture the event.
  const logger = console;
  logger.error(error);
  if (process.env.ENV !== 'development') {
    logger.error({
      distinctId: 'TBD',
      event: 'Error',
      properties: {
        level: 'fatal',
        from: 'TBD',
        stack: error.stack,
        message: error.message,
        environment: process.env.ENV,
      },
    });
    process.exit(1);
  } else {
    process.exit(1);
  }
};

process.on('uncaughtException', captureFatalError);
process.on('unhandledRejection', captureFatalError);
