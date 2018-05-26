/**
 * @file k.config.js
 * @author pashangshangpo
 * @createTime 2018年5月26日 下午12:25
 */

module.exports = {
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
  }
}
