/**
 * ...
 */


const path = require('path');


module.exports = {
  target: 'node',
  devServer: {
    ip: 'localhost',
    port: 3000,
  },
  entry: {
    main: './main.ts',
  },
  srcPath: path.resolve(__dirname, 'src'),
  distPath: path.resolve(__dirname, 'public'),
  banner: '',
};
