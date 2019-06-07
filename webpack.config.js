module.exports = {
  entry: [
    './index.js',
  ],
  output: {
    path: __dirname,
    filename: './dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {test: /\.css$/, loader: 'style-loader!css-loader'},
      {test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ]
  },
  mode: 'development'
}