import { Json } from 'basx';

/**
 * Fastify validation and serialization schema used as a basis for endpoints.
 */
export default function createSchema(schema: Json): Json {
  const finalSchema = schema;
  if (schema.body !== undefined) {
    finalSchema.body.additionalProperties = false;
    finalSchema.body.errorMessage = {
      ...finalSchema.body.errorMessage,
      type: 'Request body should be a valid object',
    };
  }
  return finalSchema;
}
