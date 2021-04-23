import Ajv from 'ajv';
import fastify from 'fastify';
import ajvErrors from 'ajv-errors';
import 'source-map-support/register';
import configuration from 'scripts/conf/app';
import declareRoutes from 'scripts/conf/routes';
import handleError from 'scripts/helpers/handleError';
import handleNotFound from 'scripts/helpers/handleNotFound';

// Initializing validator compiler...
const ajv = new Ajv({ allErrors: true, removeAdditional: true, coerceTypes: true });
ajvErrors(ajv);

// Initializing fastify server...
const app = fastify({
  logger: configuration.logger,
  keepAliveTimeout: configuration.keepAliveTimeout,
  connectionTimeout: configuration.connectionTimeout,
  ignoreTrailingSlash: configuration.ignoreTrailingSlash,
});

// Default errors handlers.
app.setErrorHandler(handleError);
app.setNotFoundHandler(handleNotFound);

// Handles CORS in development mode.
if (configuration.mode === 'development') {
  app.addHook('onRequest', (request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', '*');
    response.header('Access-Control-Allow-Methods', '*');
    if (request.method === 'OPTIONS') {
      response.status(200).send();
    } else {
      next();
    }
  });
}

// Applies custom validator compiler.
app.setValidatorCompiler(({ schema }) => (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ajv.compile(schema) as any
));

// Logs requests timeouts.
app.addHook('onTimeout', (request, _response, done) => {
  app.log.error(`Error: request "${request.method} ${request.url}" timed out.`);
  done();
});

// Catch-all for unsupported content types. Prevents fastify from throwing HTTP 500 when dealing
// with unknown payloads. See https://www.fastify.io/docs/latest/ContentTypeParser/.
app.addContentTypeParser('*', (_request, payload, next) => {
  if (/^multipart\/form-data/.test(payload.headers['content-type'] as string)) {
    next(null, payload);
  } else {
    let data = '';
    payload.on('data', (chunk) => { data += chunk; });
    payload.on('end', () => { next(null, data); });
  }
});

// Adding app routes...
declareRoutes(app);

// Starting server...
app.listen(configuration.port, '0.0.0.0', (error) => {
  if (error) {
    app.log.fatal(error);
    process.exit(1);
  }
});
