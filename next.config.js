const path = require('path');
const Dotenv = require('dotenv-webpack');

const ENV = process.env.NODE_ENV || 'development';

module.exports = {
  webpack: config => {
    config.node = {
      fs: 'empty'
    };

    config.plugins = config.plugins || [];

    let envFilePath = 'env/.env';
    if (ENV !== 'production') {
      envFilePath = envFilePath + '.' + ENV;
    }

    config.plugins = [
      ...config.plugins,

      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, envFilePath),
        systemvars: true
      })
    ];

    return config;
  }
};
