/**
 * App configuration.
 */
export default {
  // App identifier, for monitoring.
  appId: <string>process.env.PROJECT_NAME,
  // Mode (development | production).
  mode: <string>process.env.ENV,
  // Server's port.
  port: parseInt(process.env.BACKEND_PORT || '9000', 10),
  // Logging options.
  logger: {
    prettyPrint: (process.env.ENV !== 'development')
      ? false
      : {
        ignore: 'hostname,pid',
        translateTime: 'HH:MM:ss',
        suppressFlushSyncWarning: true,
        colorize: process.env.ENV === 'development',
      },
    level: (process.env.ENV === 'development') ? 'info' : 'error',
  },
  // Indexing settings.
  trustedProxies: <string>process.env.TRUSTED_PROXIES,
  // Server's options.
  keepAliveTimeout: 2000,
  connectionTimeout: 3000,
  ignoreTrailingSlash: true,
};
