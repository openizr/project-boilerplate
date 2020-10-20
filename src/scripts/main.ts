/**
 * Copyright (c) ...
 * All rights reserved.
 */

import fastify from 'fastify';
import ajvErrors from 'ajv-errors';
import handleError from 'scripts/lib/handleError';
import handleNotFound from 'scripts/lib/handleNotFound';
import v1PostTest from 'scripts/routes/v1/postTest';
import fastifyCors from 'fastify-cors';
import helmet from 'fastify-helmet';

const app = fastify({
  logger: true,
  ajv: {
    customOptions: { allErrors: true, jsonPointers: true },
    plugins: [ajvErrors],
  },
  keepAliveTimeout: 2000,
  connectionTimeout: 3000,
  ignoreTrailingSlash: true,
});

app.register(helmet, {
  ieNoOpen: false,
  xssFilter: false,
  hidePoweredBy: false,
  hsts: { maxAge: 123456 },
  frameguard: { action: 'sameorigin' },
});

app.register(fastifyCors, {
  origin: ['http://a.com'], // FALSE => disable CORS
  maxAge: 300,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Authorization'],
  credentials: false,
  optionsSuccessStatus: 200,
});

app.setErrorHandler(handleError);
app.setNotFoundHandler(handleNotFound);

/**
 * V1 endpoints.
 */
app.register((instance, _options, done) => {
  instance.post('/test', v1PostTest);
  done();
}, { prefix: '/v1' });

// Starting server...
app.listen(3000, '0.0.0.0', (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`server listening on ${address}`);
});
