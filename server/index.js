/**
 * @file 入口
 * @author pashangshangpo
 * @createTime 2018年5月26日 下午12:07
 */

const { join } = require('path');
const program = require('commander');
const merge = require('webpack-merge');
const portIsOccupied = require('./util/portUtil');
const defaultPort = 8087;

let {
  resolveApp,
  webpackDevPath,
  devServerPath,
  tempPath,
  kConfigPath,
  rootKConfigPath,
  userKConfigPath
} = require('../config/paths');

const kConfig = require(kConfigPath);

const packageName = 'package.json';
const packagePath = resolveApp('src', packageName);

// 配置
const config = {
  envDefault: {
    start: 'dev'
  },
  getEnVConfig: (envConfig, type, env) => {
    return {
      outputPath: join('dev', env),
      publicPath: '/',
      // 合并inject
      inject: merge(kConfig.inject, envConfig.inject),
      // 合并move
      move: merge({ move: [] }, { move: kConfig.move }, { move: envConfig.move }).move
    };
  }
};

// 获取用户输入的信息
program
  .version('0.0.1')
  .description('一个快速搭建Webpack环境工具')
  .option('-t, --type [type]', '你要执行的命令是?如:start')
  .option('-p, --port [port]', '端口', defaultPort)
  .option('-e, --env [env]', '上下文环境')
  .option('-s, --server [server]', '生产环境起服务,调试')
  .option('-d, --debug [debug]', '生产环境开启devtool,用于调试,上线请勿使用')
  .parse(process.argv);

// 参数判断
if (!program.env) {
  program.env = config.envDefault[program.type];
}

// 端口
const userPort = Math.ceil(program.port);

// 启动服务
const runServer = (devServerPath, port, webpackDevPath, outputPath, publicPath, inject) => {
  console.log('正在为您启动本地服务...');

  require(devServerPath)({
    port,
    webpackConfig: require(webpackDevPath)(outputPath, publicPath),
    inject,
  });
};

let { type, env, server, debug } = program;

// 当前配置
const currentConfig = config.getEnVConfig(kConfig.env[env], type, env);

// 开发环境
if (type === 'start') {
  currentConfig.outputPath = resolveApp(currentConfig.outputPath);

  // 判断端口是否被占用
  portIsOccupied(userPort, true, port => {
    if (port !== userPort && userPort !== defaultPort) {
      console.log('您输入的端口', userPort, '被占用,重新为您分配了一个端口:', port);
    }

    runServer(
      devServerPath,
      port,
      webpackDevPath,
      currentConfig.outputPath,
      currentConfig.publicPath,
      currentConfig.inject
    );
  });
}
