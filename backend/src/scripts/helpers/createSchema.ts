import { Json } from 'basx';

/**
 * Fastify validation and serialization schema used as a basis for endpoints.
 */
export default function createSchema(schema: Json): Json {
  const finalSchema = schema;
  if (schema.body !== undefined) {
    finalSchema.body = {
      type: 'object',
      additionalProperties: false,
      ...finalSchema.body,
      errorMessage: {
        type: 'Request body should be a valid object.',
        ...finalSchema.body.errorMessage,
      },
    };
  }
  if (schema.query !== undefined) {
    finalSchema.query = {
      type: 'object',
      additionalProperties: false,
      ...finalSchema.query,
      errorMessage: {
        type: 'Request query should be a valid object.',
        ...finalSchema.query.errorMessage,
      },
    };
  }
  if (schema.params !== undefined) {
    finalSchema.params = {
      type: 'object',
      additionalProperties: false,
      ...finalSchema.params,
      errorMessage: {
        type: 'Request params should be a valid object.',
        ...finalSchema.params.errorMessage,
      },
    };
  }
  return finalSchema;
}
