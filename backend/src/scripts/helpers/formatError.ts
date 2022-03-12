import { BadRequest } from 'scripts/lib/errors';

interface ValidationError {
  keyword?: string;
  message?: string;
  instancePath?: string;
  params?: Record<string, string>;
}

/**
 * Formats `error`.
 *
 * @param {ValidationError[]} error Error to format.
 *
 * @param {string} dataVar Additional info to format error with.
 *
 * @returns {Error} Formatted error.
 */
export default function formatError(error: ValidationError[], dataVar: string): Error {
  let message = error[0].message || '';
  const { keyword, instancePath, params } = error[0];

  const fullPath = `${dataVar}${(instancePath as string).replace(/\//g, '.')}`;
  message = `Request's ${fullPath} ${message}`;
  if (keyword === 'required') {
    message = `Request's ${fullPath}.${params?.missingProperty} is required.`;
  }

  return new BadRequest('invalid_payload', message);
}
