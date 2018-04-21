const {join} = require('path');
const {
	resolveApp,
	postcssPath,
	devClientPath,
	dllPath,
	commonJsName,
	webpackCommonPath,
	cssPath
} = require('./paths');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require(webpackCommonPath);
let entry = common.entry;

// 自动添加webpack-hot-middleware
let hotConfig = [
	'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
	devClientPath
];

for (let key in entry) {
	let section = entry[key];

	if (Array.isArray(section)) {
		section[0] = resolveApp(section[0]);
		section.unshift.apply(section, hotConfig);
	} else {
		entry[key] = hotConfig.concat([resolveApp(section)]);
	}
}

module.exports = (outputPath, publicPath) => {
	return merge(common, {
		module: {
			rules: [
				{
					test: /\.less$/,
					use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									sourceMap: 1
								}
							},
							{
								loader: 'less-loader'
							}
						]
					}))
				},
        {
					test: /\.css$/,
					exclude: resolveApp('node_modules'),
					include: [resolveApp('src')],
					use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									importLoaders: 1
								}
							}
						]
					}))
				}
			]
		},
		output: {
			filename: '[name].js',
			// 代码分割时的
			chunkFilename: '[chunkhash].chunk.js',
			path: outputPath,
			publicPath: publicPath
		},
		devtool: 'eval-source-map',
		plugins: [
			// 提取css
			new ExtractTextPlugin(cssPath),
			// 环境变量
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': "'production'"
				}
			}),
			// 提取公共代码,针对多入口有用
			new webpack.optimize.CommonsChunkPlugin({
				name: commonJsName
			}),
			// 热加载
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin(),
			new webpack.optimize.ModuleConcatenationPlugin()
		]
	});
};
