import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * `GET /health` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): Promise<void> => Promise.resolve()
    .then(() => {
      response.send();
    }),
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
};
