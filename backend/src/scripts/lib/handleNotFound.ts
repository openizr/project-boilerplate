/**
 * Copyright (c) ...
 * All rights reserved.
 */

import { FastifyRequest, FastifyReply } from 'fastify';

/**
 * Handles Not Found errors and formats a clean HTTP response.
 *
 * @param {FastifyRequest} request HTTP request.
 *
 * @param {FastifyReply} response HTTP response.
 *
 * @returns {void}
 */
export default function handleNotFound(_request: FastifyRequest, response: FastifyReply): void {
  response
    .status(404)
    .send({ error: { code: 404, message: 'Not Found' } });
}
