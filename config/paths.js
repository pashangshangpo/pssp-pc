/**
 * @file 路径配置
 * @author pashangshangpo
 * @createTime 2018年5月26日 下午12:13
 */

const { resolve, join } = require('path');

const resolveOwn = path => {
  return resolve(__dirname, path);
};

const resolveApp = function () {
  return resolve('.', [].slice.apply(arguments).join('/'));
};

const project = resolveApp('').split('/').pop();
const configPath = resolveApp('config');
const serverPath = resolveApp('server');

const templatePath = join(configPath, 'template.html');

const webpackDevPath = join(configPath, 'webpack.dev.config.js');
const devClientPath = join(serverPath, 'dev.client.js');

const devServerPath = join(serverPath, 'server.dev.js');

const webpackCommonPath = join(configPath, 'webpack.common.js');

const cssPath = 'css/index.css';

const commonJsName = 'common';
const manifestName = 'manifest.json';

const tempPath = resolveApp('temp');

const rootKConfigPath = 'k.config.js';
const kConfigPath = join(configPath, rootKConfigPath);
const userKConfigPath = resolveApp(rootKConfigPath);

const storePath = join(tempPath, 'store.db');

module.exports = {
  resolveOwn,
  resolveApp,
  project,
  templatePath,
  webpackDevPath,
  webpackCommonPath,
  devServerPath,
  commonJsName,
  tempPath,
  kConfigPath,
  userKConfigPath,
  rootKConfigPath,
  devClientPath,
  cssPath,
  manifestName,
  storePath
};
