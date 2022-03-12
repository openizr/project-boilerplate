/**
 * fs-extra mock.
 */
const writeFile = jest.fn();
const remove = jest.fn();
const createWriteStream = jest.fn(() => ({
  end: jest.fn(),
  write: jest.fn(),
  on: jest.fn((eventName, callback) => {
    if (eventName === 'close') {
      callback();
    }
    setTimeout(() => {
      if (process.env.FS_ERROR_STREAM === 'true') {
        callback(new Error('error'));
      } else {
        callback();
      }
    }, 100);
  }),
}));
const existsSync = jest.fn((path) => (path === '/var/www/html/node_modules/.cache/test'));
const readFile = jest.fn(() => {
  if (process.env.FS_ERROR === 'true') {
    throw new Error('fs_error');
  } if (process.env.EXPIRATION === '-1') {
    return '{"data":"{\\"data\\":\\"test\\"}","expiration":-1}';
  }
  return '{"data":"{\\"data\\":\\"test\\"}","expiration":100000}';
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
