import fs from 'fs-extra';
import CacheClient from 'scripts/lib/CacheClient';

jest.mock('fs-extra');
Date.now = jest.fn(() => 1624108129052);

describe('lib/CacheClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('set - with expiration', async () => {
    await CacheClient.set('test', JSON.stringify({ data: 'test' }), 3600);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith('/var/www/html/node_modules/.cache/test', '{"data":"{\\"data\\":\\"test\\"}","expiration":1624111729052}');
  });

  test('set - with no expiration', async () => {
    await CacheClient.set('test', JSON.stringify({ data: 'test' }), -1);
    expect(fs.writeFile).toHaveBeenCalledTimes(1);
    expect(fs.writeFile).toHaveBeenCalledWith('/var/www/html/node_modules/.cache/test', '{"data":"{\\"data\\":\\"test\\"}","expiration":-1}');
  });

  test('delete', async () => {
    await CacheClient.delete('test');
    expect(fs.remove).toHaveBeenCalledTimes(1);
    expect(fs.remove).toHaveBeenCalledWith('/var/www/html/node_modules/.cache/test');
  });

  test('get - cache does not exist', async () => {
    await CacheClient.get('notfound');
    expect(fs.readFile).not.toHaveBeenCalled();
  });

  test('get - cache exists, fs error', async () => {
    process.env.FS_ERROR = 'true';
    await expect(async () => CacheClient.get('test')).rejects.toEqual({ message: 'fs_error' });
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    delete process.env.FS_ERROR;
  });

  test('get - cache exists, no expiration', async () => {
    process.env.EXPIRATION = '-1';
    const data = await CacheClient.get('test');
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(data).toBe('{"data":"test"}');
    delete process.env.EXPIRATION;
  });

  test('get - cache exists, data expired', async () => {
    const data = await CacheClient.get('test');
    expect(fs.readFile).toHaveBeenCalledTimes(1);
    expect(data).toBe(null);
  });
});
