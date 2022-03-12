import { FastifyRequest, FastifyReply } from 'fastify';
import createSchema from 'scripts/helpers/createSchema';

/**
 * `POST /v1/message` endpoint handler.
 */
export default {
  handler: async (_request: FastifyRequest, response: FastifyReply): Promise<void> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    response.send();
  },
  schema: createSchema({
    body: {
      required: ['message'],
      properties: {
        message: { type: 'string' },
      },
    },
    response: {
      200: {
        type: 'string',
      },
    },
  }),
};
