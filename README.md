# 说明

这是一个测试目录，主要练习 react webpack babel(es6) 的编译和配置。

### 1. webpack 环境搭建（版本6）

~~~bash
cnpm install webpack -g
cnpm install webpack-cli 先把 loaders 
cnpm install webpack-dev-server -g
# webpack 自带的CLI环境和本地的测试服务器安装
~~~

### 2. 相关的依赖库

~~~bash
npm init
# 初始化项目

# webpack 本地依赖库
cnpm install webpack --save-dev
cnpm install webpack-dev-server --save-dev

# babel 库
cnpm install babel-core --save-dev
# 核心组件
cnpm install babel-preset-es2015 --save-dev
# 这是babel对于ES6(es2015)的预设
# babel 对于 react 的预设
cnpm install babel-preset-react --save-dev
cnpm install babel-loader --save-dev # babel 加载器

# react
cnpm install react --save-dev
cnpm install react-dom --save-dev
cnpm install react-hot-loader -dev--save # 热更新

# css 优化
cnpm install style-loader -D
cnpm install css-loader -D

# 装完后检查一下是否完整
~~~


### 3. webpack 配置

~~~js
// webpack.config.js
module.exports = {
  entry: './index.js',
  // 入口文件
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  // 出口文件和输出文件名
  devtool: 'source-map',
  // 浏览器开发工具（显示原文件的位置）浏览器自带
  module: {
    loaders: [
      {test: /\.css$/, loader: 'style!css'},
      {test: /\.js$/, loader: 'react-hot!babel', exclude: /node_modules/},
    ]
  }
  // 加载器：对于css结尾的文件使用 style-loader || css-loader 处理，对于 js 文件使用后面的处理，排除掉node_nodules 下面的文件。
}
~~~

babel 配置

~~~js
// .babelrc
{
  presets: [['es2015'], ['react']]
}
// 注意：是双数组
~~~

### 4. 运行 webpack

此时出现问题：配置 loaders 改成 rules, react-hot 一直报错所以删了，babel 改成 babel-loader.

最后界面中可以显示当前的应用

### 5. 高级配置

make dist

直接运行 make dist 即可进行编译和迁移css文件

~~~makefile
PROJECT=Michale

# 依次运行 clean transpile postdist
dist: clean transpile postdist

# 删除dist下面的代码
clean:
	@echo '--> Cleaning dist'
	rm -rf dist/*
	@echo "\033[32;36m clean dist success \033[0m"

# 编译核心：使用生产环境模板编译代码
transpile:
	@echo "--> Compile dist"
	export NODE_ENV=production && webpack
	@echo "\033[32;36m compile dist success \033[0m"

# 移动CSS文件
postdist:
	@echo "--> Copy css and remove settings.js"
	cp -r css dist/css
	@echo "\033[32;36m post dist success \033[0m"

.PHONY: transpile postdist clean
~~~

