import { FastifyRequest, FastifyReply } from 'fastify';
import createSchema from 'scripts/helpers/createSchema';

/**
 * `GET /v1/message` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): void => {
    response.send({ message: 'WELCOME_MESSAGE' });
  },
  schema: createSchema({
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  }),
};
