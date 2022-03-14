export type ErrorLevel = 'info' | 'error' | 'fatal';

const isDevelopmentMode = process.env.ENV === 'development';

const logger = console;

/**
 * Only used internally to capture fatal errors.
 */
const captureFatalError = (error: Error): void => {
  if (!isDevelopmentMode) {
    logger.error('Error', {
      level: 'fatal',
      from: 'frontend',
      message: error.message,
      stack: error.stack,
      environment: process.env.ENV,
    });
  }
};

window.addEventListener('unhandledrejection', (event): void => {
  captureFatalError({ name: 'Error', message: event.reason.message, stack: event.reason.stack });
});

window.onerror = (message, _url, _lineNo, _columnNo, error): boolean => {
  captureFatalError({ name: 'Error', message: <string>message, stack: error?.stack });
  return false;
};

export default {
  /**
   * Captures the given error and sends a clean event to PostHog in (pre)production modes.
   *
   * @param {ErrorLevel} level Error level.
   *
   * @param {Error} error Error to capture.
   *
   * @returns {void}
   */
  captureError: (level: ErrorLevel, error: Error): void => {
    if (!isDevelopmentMode) {
      logger.error('Error', {
        level,
        from: 'frontend',
        stack: error.stack,
        message: error.message,
        environment: process.env.ENV,
      });
    }
  },
};
