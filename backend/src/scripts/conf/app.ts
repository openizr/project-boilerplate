/**
 * App configuration.
 */
export default {
  // Mode (development | production).
  mode: <string>process.env.ENV,
  // Server's port.
  port: parseInt(process.env.BACKEND_PORT || '9000', 10),
  // Logging options.
  logger: {
    level: (process.env.ENV === 'development') ? 'info' : 'error',
  },
  // Server's options.
  keepAliveTimeout: 2000,
  connectionTimeout: 3000,
  ignoreTrailingSlash: true,
};
