/**
 * Copyright (c) ...
 * All rights reserved.
 */

import { deepMerge } from 'basx';
import schema from 'scripts/lib/baseSchema';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * `POST /v1/message` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): Promise<void> => Promise.resolve()
    .then(() => {
      response.send();
    }),
  schema: deepMerge(schema,
    {
      body: {
        type: 'object',
        required: ['message'],
        properties: {
          message: {
            type: 'string',
          },
        },
        errorMessage: {
          properties: {
            message: 'Body.message must be a string',
          },
          required: {
            message: 'Body.message is required',
          },
        },
      },
      response: {
        200: {
          type: 'string',
        },
      },
    }),
};
