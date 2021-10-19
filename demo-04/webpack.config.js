const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  // 入口
  entry: "./src/index.tsx",

  // 出口：设置文件名加入哈希；路径使用绝对路径
  output: {
    filename: "bundle-[name].[chunkhash:6].js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  // 开发环境打包
  mode: "development",

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  externals: {
    "react": "React",
    "react-dom": "ReactDOM"
  },

  // https://webpack.docschina.org/configuration/dev-server/
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
    },
    compress: true, // 启用 gzip compression
    open: true, // 编译完成后自动打开浏览器
    port: 3000,
    hot: true, // 启用热更新
    // contentBase: 'dist' 指定托管的更目录
  },

  plugins: [
    // 生产环境自动清理 dist 目录。如果开发环境下，编译后的文件在内存中，不需要清理，不需要这个插件，可以通过传参设置插件
    // https://github.com/johnagan/clean-webpack-plugin
    new CleanWebpackPlugin(),

    // https://webpack.docschina.org/plugins/html-webpack-plugin/
    // 设置插件后，直接在 dist 目录下面生成新的 HTML
    new HtmlWebpackPlugin({
      // https://github.com/jantimon/html-webpack-plugin#options
      title: 'Michael An demo04 App',
      filename: "index.html",
      // 定义模板（复制模板到 dist 路径下）
      template: './src/index.html',
      inject: "body", // 打包后的script插入到bodyscript的最后面
    }),
  ],
};
