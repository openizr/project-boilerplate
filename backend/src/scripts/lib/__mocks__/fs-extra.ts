/**
 * fs-extra mock.
 */
const writeFile = jest.fn();
const remove = jest.fn();
const createWriteStream = jest.fn(() => ({ write: jest.fn() }));
const existsSync = jest.fn((path) => (path === '/var/www/html/node_modules/.cache/test'));
const readFile = jest.fn((_path, callback) => {
  if (process.env.FS_ERROR === 'true') {
    callback({ message: 'fs_error' });
  } else if (process.env.EXPIRATION === '-1') {
    callback(null, '{"data":"{\\"data\\":\\"test\\"}","expiration":-1}');
  } else {
    callback(null, '{"data":"{\\"data\\":\\"test\\"}","expiration":100000}');
  }
});

export default {
  remove,
  readFile,
  writeFile,
  existsSync,
  createWriteStream,
};

export {
  remove,
  readFile,
  writeFile,
  existsSync,
  createWriteStream,
};
