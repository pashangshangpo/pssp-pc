const merge = require('webpack-merge')
const { userKConfigPath } = require('./paths')

// 合并默认配置
module.exports = merge(
  {
    env: {
      dev: {
        publicPath: '/',
        outputPath: 'dist/dev',
        inject: {
        }
      },
      dest: {
        publicPath: '/',
        outputPath: 'dist/dest'
      }
    },
    inject: {
      js: [
      ]
    },
  },
  require(userKConfigPath)
);
