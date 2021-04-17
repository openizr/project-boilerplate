import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { generateId } from 'basx';
import multiparty from 'multiparty';
import { IncomingMessage as Payload } from 'http';
import { BadRequest, RequestEntityTooLarge, UnprocessableEntity } from 'scripts/lib/exceptions';

interface Fields {
  [name: string]: {
    id: string;
    size: number;
    type: string;
    path: string;
    name: string;
  }[];
}

interface Options {
  maxFields?: number;
  maxFileSize?: number;
  maxTotalSize?: number;
  maxFieldsSize?: number;
  allowedMimeTypes?: string[];
}

/**
 * Parses `multipart/form-data` payload, and returns its data.
 *
 * @param {IncomingMessage} payload Request payload.
 *
 * @param {Options} [options = {}] Parser options.
 * By default: `{
 *  allowedMimeTypes: [],
 *  maxTotalSize: 10000000,
 *  maxFileSize: 2000000,
 * }`
 *
 * @returns {Promise<File[]>} A new Promise for asynchronous handling.
 */
export default function parseFormData(payload: Payload, options: Options = {}): Promise<Fields> {
  let totalSize = 0;
  let totalFiles = 0;
  const allowedMimeTypes = options.allowedMimeTypes || [];
  const maxTotalSize = options.maxTotalSize || 10000000;
  const maxFileSize = options.maxFileSize || 2000000;
  return new Promise((resolve, reject) => {
    const fields: Fields = {};

    const parser = new multiparty.Form({
      maxFields: options.maxFields,
      maxFieldsSize: options.maxFieldsSize,
    });

    parser.on('close', () => resolve(fields));

    // Non-file fields parsing logic.
    parser.on('field', () => null);

    // Global payload errors handling.
    parser.on('error', (error) => {
      if (/maxFieldsSize/i.test(error.message)) {
        reject(new RequestEntityTooLarge('Maximum non-file fields size exceeded'));
      } else if (/maxFields/i.test(error.message)) {
        reject(new RequestEntityTooLarge('Maximum number of fields exceeded'));
      } else if (/missing content-type header/i.test(error.message)) {
        reject(new UnprocessableEntity('Missing "Content-Type" header'));
      } else {
        reject(error);
      }
    });

    // Files parsing logic.
    parser.on('part', (part) => {
      part.on('error', reject);
      if (allowedMimeTypes.includes(part.headers['content-type']) === false) {
        reject(new BadRequest(`Invalid file type "${part.headers['content-type']}" for file "${part.filename}"`));
      } else {
        const fileIndex = totalFiles;
        totalFiles += 1;
        const fileId = generateId();
        const filePath = path.join(os.tmpdir(), fileId);
        const fileStream = fs.createWriteStream(filePath);
        fields[part.name] = fields[part.name] || [];
        fields[part.name].push({
          size: 0,
          id: fileId,
          path: filePath,
          name: part.filename,
          type: part.headers['content-type'],
        });
        part.on('data', (stream: Buffer) => {
          const size = stream.length;
          totalSize += size;
          fields[part.name][fileIndex].size += size;
          if (totalSize > maxTotalSize) {
            reject(new RequestEntityTooLarge('Maximum total files size exceeded'));
          }
          if (fields[part.name][fileIndex].size > maxFileSize) {
            reject(new RequestEntityTooLarge(`Maximum size exceeded for file "${part.filename}"`));
          }
          fileStream.write(stream);
        });
      }
    });

    parser.parse(payload);
  });
}
