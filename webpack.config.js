module.exports = {
  module: {
    rules: [
			{
				test: /\.js$/,
				use: ['babel-loader?cacheDirectory']
			},
			{
				test: /\.(png|jpg|gif)/,
				use: [
					{
						loader: 'url-loader'
					}
				]
      },
      {
        test: /\.svg/,
        use: ['svg-sprite-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
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
      }
		]
  },
  resolve: {
    extensions: ['', 'js', 'jsx'],
    modules: [
      'node_modules'
    ]
  }
};
