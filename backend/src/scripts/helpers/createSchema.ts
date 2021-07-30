/**
 * Fastify validation and serialization schema used as a basis for endpoints.
 */
export default function createSchema(schema: Json): Json {
  const finalSchema = schema;
  if (schema.body !== undefined) {
    finalSchema.body = {
      type: 'object',
      additionalProperties: false,
      ...schema.body,
      errorMessage: {
        type: 'Request body should be a valid object.',
        ...schema.body.errorMessage,
      },
    };
  }
  if (schema.query !== undefined) {
    finalSchema.query = {
      type: 'object',
      additionalProperties: false,
      ...schema.query,
      errorMessage: {
        type: 'Request query should be a valid object.',
        ...schema.query.errorMessage,
      },
    };
  }
  if (schema.params !== undefined) {
    finalSchema.params = {
      type: 'object',
      additionalProperties: false,
      ...schema.params,
      errorMessage: {
        type: 'Request params should be a valid object.',
        ...schema.params.errorMessage,
      },
    };
  }
  return finalSchema;
}
