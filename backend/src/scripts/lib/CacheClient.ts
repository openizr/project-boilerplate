import fs from 'fs-extra';

const cachePath = '/var/www/html/node_modules/.cache';

export default {
  set(key: string, data: string, duration: number): Promise<void> {
    return fs.writeFile(`${cachePath}/${key}`, JSON.stringify({
      data,
      expiration: (duration === -1) ? -1 : Date.now() + duration * 1000,
    }));
  },
  delete(key: string): Promise<void> {
    return fs.remove(`${cachePath}/${key}`);
  },
  async get(key: string): Promise<(string | null)> {
    if (fs.existsSync(`${cachePath}/${key}`)) {
      const content = await fs.readFile(`${cachePath}/${key}`);
      const cache = JSON.parse(content.toString());
      return (cache.expiration === -1 || Date.now() <= cache.expiration)
        ? cache.data
        : null;
    }
    return null;
  },
};
