import fs from 'fs-extra';
import { IncomingMessage as Payload } from 'http';
import parseFormData from 'scripts/helpers/parseFormData';
import { RequestEntityTooLarge, UnprocessableEntity, BadRequest } from 'scripts/lib/errors';

jest.mock('os');
jest.mock('path');
jest.mock('fs-extra');
jest.mock('multiparty');

describe('helpers/parseFormData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('handles error - field too large', async () => {
    process.env.MUTIPARTY_ERROR_FIELD_TOO_LARGE = 'true';
    const error = new RequestEntityTooLarge('field_too_large', 'Maximum non-file fields size exceeded.');
    await expect(() => parseFormData({} as unknown as Payload)).rejects.toEqual(error);
    delete process.env.MUTIPARTY_ERROR_FIELD_TOO_LARGE;
  });

  test('handles error - too many fields', async () => {
    process.env.MUTIPARTY_ERROR_TOO_MANY_FIELDS = 'true';
    const error = new RequestEntityTooLarge('too_many_fields', 'Maximum number of fields exceeded.');
    await expect(() => parseFormData({} as unknown as Payload)).rejects.toEqual(error);
    delete process.env.MUTIPARTY_ERROR_TOO_MANY_FIELDS;
  });

  test('handles error - missing content-type header', async () => {
    process.env.MUTIPARTY_ERROR_MISSING_HEADER = 'true';
    const error = new UnprocessableEntity('missing_content_type_header', 'Missing "Content-Type" header.');
    await expect(() => parseFormData({} as unknown as Payload)).rejects.toEqual(error);
    delete process.env.MUTIPARTY_ERROR_MISSING_HEADER;
  });

  test('handles error - other error', async () => {
    process.env.MUTIPARTY_ERROR_OTHER = 'true';
    const error = new Error('other error');
    await expect(() => parseFormData({} as unknown as Payload)).rejects.toEqual(error);
    delete process.env.MUTIPARTY_ERROR_OTHER;
  });

  test('handles error - invalid file type', async () => {
    const error = new BadRequest('invalid_file_type', 'Invalid file type "image/png" for file "undefined".');
    await expect(() => parseFormData({} as unknown as Payload)).rejects.toEqual(error);
  });

  test('handles error - file too large', async () => {
    const options = { allowedMimeTypes: ['image/png'], maxFileSize: 10 };
    const error = new BadRequest('file_too_large', 'Maximum size exceeded for file "undefined".');
    await expect(() => parseFormData({} as unknown as Payload, options)).rejects.toEqual(error);
  });

  test('handles error - files too large', async () => {
    const options = { allowedMimeTypes: ['image/png'], maxFileSize: 100, maxTotalSize: 10 };
    const error = new BadRequest('files_too_large', 'Maximum total files size exceeded.');
    await expect(() => parseFormData({} as unknown as Payload, options)).rejects.toEqual(error);
  });

  test('handles error - stream error', async () => {
    process.env.FS_ERROR_STREAM = 'true';
    const options = { allowedMimeTypes: ['image/png'] };
    const error = new Error('error');
    await expect(() => parseFormData({} as unknown as Payload, options)).rejects.toEqual(error);
    delete process.env.FS_ERROR_STREAM;
  });

  test('correctly parses data - 0 field', async () => {
    process.env.MUTIPARTY_NO_FIELD = 'true';
    const options = { allowedMimeTypes: ['image/png'] };
    await parseFormData({} as unknown as Payload, options);
    expect(fs.createWriteStream).toHaveBeenCalledTimes(0);
    delete process.env.MUTIPARTY_NO_FIELD;
  });

  test('correctly parses data - 1 file', async () => {
    const options = { allowedMimeTypes: ['image/png'] };
    await parseFormData({} as unknown as Payload, options);
    expect(fs.createWriteStream).toHaveBeenCalledTimes(1);
  });
});
