import os from 'os';
import path from 'path';
import fs from 'fs-extra';
import { generateId } from 'basx';
import multiparty from 'multiparty';
import { IncomingMessage as Payload } from 'http';
import { BadRequest, RequestEntityTooLarge, UnprocessableEntity } from 'scripts/lib/errors';

/**
 * Uploaded file.
 */
export interface File {
  id: string;
  size: number;
  type: string;
  path: string;
  name: string;
}

/**
 * Parsed multipart/form-data fields.
 */
export interface Fields {
  [name: string]: string | File[];
}

/**
 * Multipart/form-data parser options.
 */
export interface Options {
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
 * @returns {Promise<Fields>} Parsed form fields.
 */
export default function parseFormData(payload: Payload, options: Options = {}): Promise<Fields> {
  let totalSize = 0;
  let totalFiles = 0;
  const allowedMimeTypes = options.allowedMimeTypes || [];
  const maxTotalSize = options.maxTotalSize || 10000000;
  const maxFileSize = options.maxFileSize || 2000000;
  return new Promise((resolve, reject) => {
    const fields: Fields = {};
    let parserClosed = false;
    let numberOfParts = 0;
    let numberOfClosedParts = 0;

    const parser = new multiparty.Form({
      maxFields: options.maxFields,
      maxFieldsSize: options.maxFieldsSize,
    });

    parser.on('close', () => {
      parserClosed = true;
      if (numberOfParts === 0) {
        resolve(fields);
      }
    });

    // Non-file fields parsing logic.
    parser.on('field', (name, value) => {
      fields[name] = value;
    });

    // Global payload errors handling.
    parser.on('error', (error) => {
      if (/maxFieldsSize/i.test(error.message)) {
        reject(new RequestEntityTooLarge('field_too_large', 'Maximum non-file fields size exceeded.'));
      } else if (/maxFields/i.test(error.message)) {
        reject(new RequestEntityTooLarge('too_many_fields', 'Maximum number of fields exceeded.'));
      } else if (/missing content-type header/i.test(error.message)) {
        reject(new UnprocessableEntity('missing_content_type_header', 'Missing "Content-Type" header.'));
      } else {
        reject(error);
      }
    });

    // Files parsing logic.
    parser.on('part', (part) => {
      numberOfParts += 1;
      if (allowedMimeTypes.includes(part.headers['content-type']) === false) {
        reject(new BadRequest('invalid_file_type', `Invalid file type "${part.headers['content-type']}" for file "${part.filename}".`));
      } else {
        const fileIndex = totalFiles;
        totalFiles += 1;
        const fileId = generateId();
        const filePath = path.join(os.tmpdir(), fileId);
        const fileStream = fs.createWriteStream(filePath);
        const closeStream = (error: Error | null): void => {
          fileStream.end();
          if (error !== null && error !== undefined) {
            reject(error);
          }
        };
        fileStream.on('error', closeStream);
        fileStream.on('close', () => {
          numberOfClosedParts += 1;
          if (parserClosed === true && numberOfClosedParts >= numberOfParts) {
            resolve(fields);
          }
        });
        fields[part.name] = fields[part.name] || [];
        (<File[]>fields[part.name]).push({
          size: 0,
          id: fileId,
          path: filePath,
          name: part.filename,
          type: part.headers['content-type'],
        });
        part.on('error', closeStream);
        part.on('close', closeStream);
        part.on('data', (stream) => {
          const size = stream.length;
          totalSize += size;
          (<File[]>fields[part.name])[fileIndex].size += size;
          if (totalSize > maxTotalSize) {
            reject(new RequestEntityTooLarge('files_too_large', 'Maximum total files size exceeded.'));
          }
          if ((<File[]>fields[part.name])[fileIndex].size > maxFileSize) {
            reject(new RequestEntityTooLarge('file_too_large', `Maximum size exceeded for file "${part.filename}".`));
          }
          fileStream.write(stream);
        });
      }
    });

    parser.parse(payload);
  });
}
