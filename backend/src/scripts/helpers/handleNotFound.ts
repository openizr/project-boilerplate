import { NotFound } from 'scripts/lib/errors';

/**
 * Handles HTTP 404 errors.
 *
 * @returns {void}
 */
export default function handleNotFound(): void {
  throw new NotFound('not_found', 'Not Found.');
}
