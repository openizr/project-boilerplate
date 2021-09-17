import { BadRequest } from 'scripts/lib/errors';

interface ValidationError {
  keyword?: string;
  message?: string;
  instancePath?: string;
  params?: Record<string, string>;
}

/**
 * Creates a new Fastify schema error formatter.
 *
 * @returns {(error : ValidationError[], dataVar: string): Error} New schema error formatter.
 */
export default function createErrorFormatter() {
  return (error: ValidationError[], dataVar: string): Error => {
    let message = error[0].message || '';
    const { keyword, instancePath, params } = error[0];

    const fullPath = `${dataVar}${(instancePath as string).replace(/\//g, '.')}`;
    message = `Request's ${fullPath} ${message}`;
    if (keyword === 'required') {
      message = `Request's ${fullPath}.${params?.missingProperty} is required.`;
    }

    return new BadRequest('invalid_payload', message);
  };
}
