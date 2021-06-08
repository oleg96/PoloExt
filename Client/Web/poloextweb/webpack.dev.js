const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const fs = require('fs');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    stats: {
      children: false
    },
    host: '0.0.0.0',
    port: 8080,
    https: true,
    https: {
        key: fs.readFileSync('./keys/privkey.pem'),
        cert: fs.readFileSync('./keys/fullchain.pem'),
        dhparam: fs.readFileSync('./keys/dh-strong.pem')
    },
    historyApiFallback: true,
    disableHostCheck: true
  }
});
