import { FastifySchema } from 'fastify';
import { AnySchemaObject } from 'ajv';

/**
 * Fastify validation and serialization schema used as a basis for endpoints.
 */
export default function createSchema(schema: AnySchemaObject): FastifySchema {
  const finalSchema = schema;
  if (schema.body !== undefined) {
    finalSchema.body = {
      type: 'object',
      additionalProperties: false,
      errorMessage: {
        type: 'must be a valid object.',
      },
      ...schema.body,
    };
  }
  if (schema.query !== undefined) {
    finalSchema.query = {
      type: 'object',
      additionalProperties: false,
      errorMessage: {
        type: 'must be a valid object.',
      },
      ...schema.query,
    };
  }
  if (schema.params !== undefined) {
    finalSchema.params = {
      type: 'object',
      additionalProperties: false,
      errorMessage: {
        type: 'must be a valid object.',
      },
      ...schema.params,
    };
  }
  return finalSchema as unknown as FastifySchema;
}
