import { FastifyInstance } from 'fastify';
import getHealth from 'scripts/routes/getHealth';
import v1GetMessage from 'scripts/routes/v1/getMessage';
import v1PostMessage from 'scripts/routes/v1/postMessage';

/**
 * App endpoints declaration.
 */
export default (server: FastifyInstance): void => {
  /**
   * V1 API endpoints.
   */
  server.register((app, _options, done) => {
    app.head('/message', (_request, response) => { response.send(); });
    app.get('/message', v1GetMessage);
    app.post('/message', v1PostMessage);
    done();
  }, { prefix: '/api/v1' });

  /**
   * Health check endpoint.
   */
  server.get('/health', getHealth);
};
