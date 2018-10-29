const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {loader: 'style-loader'},
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            //   importLoaders: 1,
            //   localIdentName: '[name]_[local]_[hash:base64]',
            //   sourceMap: true,
            //   minimize: true
            // }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules']
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    port: 5000,
    open: true,
    proxy: {
      '/': 'http://localhost:8080'
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
};