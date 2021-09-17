import { FastifySchema } from 'fastify';

type Schema = FastifySchema & { query?: unknown; } & { errorMessage?: Record<string, string>; };

/**
 * Fastify validation and serialization schema used as a basis for endpoints.
 */
export default function createSchema(schema: Schema): Schema {
  const finalSchema = schema;
  if (schema.body !== undefined) {
    finalSchema.body = {
      type: 'object',
      additionalProperties: false,
      ...<Schema>schema.body,
      errorMessage: {
        type: 'must be a valid object.',
        ...(<Schema>schema.body).errorMessage,
      },
    };
  }
  if (schema.query !== undefined) {
    finalSchema.query = {
      type: 'object',
      additionalProperties: false,
      ...<Schema>schema.query,
      errorMessage: {
        type: 'must be a valid object.',
        ...(<Schema>schema.query).errorMessage,
      },
    };
  }
  if (schema.params !== undefined) {
    finalSchema.params = {
      type: 'object',
      additionalProperties: false,
      ...<Schema>schema.params,
      errorMessage: {
        type: 'must be a valid object.',
        ...(<Schema>schema.params).errorMessage,
      },
    };
  }
  return finalSchema;
}
