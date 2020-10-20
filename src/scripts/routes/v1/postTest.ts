/**
 * Copyright (c) ...
 * All rights reserved.
 */

import schema from 'scripts/lib/baseSchema';
import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * `POST /v1/test` endpoint handler.
 */
export default {
  handler: (_request: FastifyRequest, response: FastifyReply): void => {
    response.send({ id: 1, name: 'Foo', image: 'BIG IMAGE' });
  },
  schema: {
    ...schema,
    body: {
      type: 'object',
      required: ['name'],
      properties: {
        name: {
          type: 'string',
          format: 'email',
        },
      },
      errorMessage: {
        properties: {
          name: 'Body.name must be a valid name',
          test: 'Data.test should be integer >= 2',
        },
        required: {
          name: 'Body.name is required',
          test: 'Body.test is required',
        },
      },
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
        },
      },
    },
  },
};
