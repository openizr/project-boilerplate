/**
 * Copyright (c) ...
 * All rights reserved.
 */

import fastify from 'fastify';
import ajvErrors from 'ajv-errors';
import configuration from 'scripts/conf/app';
import declareRoutes from 'scripts/conf/routes';
import handleError from 'scripts/lib/handleError';
import handleNotFound from 'scripts/lib/handleNotFound';

// Initializing fastify server...
const app = fastify({
  logger: configuration.logger,
  keepAliveTimeout: configuration.keepAliveTimeout,
  connectionTimeout: configuration.connectionTimeout,
  ignoreTrailingSlash: configuration.ignoreTrailingSlash,
  ajv: { customOptions: { allErrors: true, jsonPointers: true }, plugins: [ajvErrors] },
});

// Default errors handlers.
app.setErrorHandler(handleError);
app.setNotFoundHandler(handleNotFound);

// Handles CORS in development mode.
if (configuration.mode === 'development') {
  app.addHook('onSend', (_request, response, _payload, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    next(null, _payload);
  });
}

// Adding app routes...
declareRoutes(app);

// Starting server...
app.listen(configuration.port, '0.0.0.0', (error) => {
  if (error) {
    app.log.fatal(error);
    process.exit(1);
  }
});
