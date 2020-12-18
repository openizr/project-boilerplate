/**
 * Copyright (c) ...
 * All rights reserved.
 */

import { deepMerge } from 'basx';
import schema from 'scripts/lib/baseSchema';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * `GET /v1/message` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): Promise<void> => Promise.resolve()
    .then(() => {
      response.send({ message: 'WELCOME_MESSAGE' });
    }),
  schema: deepMerge(schema,
    {
      body: undefined,
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
