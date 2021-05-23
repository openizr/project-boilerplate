import { FastifyRequest, FastifyReply } from 'fastify';
import createSchema from 'scripts/helpers/createSchema';

/**
 * `GET /health` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): void => {
    response.send();
  },
  schema: createSchema({
    response: {
      200: {
        type: 'string',
      },
    },
  }),
};
