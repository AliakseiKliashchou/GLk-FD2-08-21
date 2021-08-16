const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // entry: './src/index.js',
  entry: {
    main: './src/index.js',
    signIn: './src/components/sign-in/sign-in.js',
    profile: './src/components/profile/profile.js'
  },
  output: {
    filename: 'bundle.[chunkhash].js',
    path: path.resolve(__dirname, 'build')
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-in.html',
      template: './src/components/sign-in/sign-in.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'sign-up.html',
      template: './src/components/sign-up/sign-up.html'
    }),
    new HTMLWebpackPlugin({
      filename: 'profile.html',
      template: './src/components/profile/profile.html'
    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    port: 4200
  }
}
