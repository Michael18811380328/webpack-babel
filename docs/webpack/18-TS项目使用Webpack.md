# Webpack 打包 TS 文件

统计信息：字数 7981  阅读16分钟


## 前言

这篇文章我们主要讲解如何使用TS与已经使用React以及webpack的项目结合使用。

## 正文

## 初始化项目结构

首先我们新建一个名字为myTsProj的文件夹（这里使用 demo-04），命令如下：
```bash
mkdir myTsProj
cd myTsProj
```

接下来创建src文件夹，用来放TS文件。然后在src文件夹里面创建components文件夹，用来放我们自己自定义的组件。

```bash
mkdir src
cd src
mkdir components
cd ..
```

Webpack会帮助我们生成dist目录。经webpack处理，会生成bundle.js文件放在dist目录下。

最后看到的文件如下：

```
proj/
├─dist/
└─ src/   
  └─components/
```

## 初始化工程
安装，使用默认值就可以了，也可以在生成的 package.json文件里修改。

```
npm init
```

## 安装依赖
1、要确保我们有安装webpack,如果没有安装，执行下面的命令：

```bash
npm install -D webpack webpack-cli
```
Webpack可以将所有代码和可选择地将依赖捆绑成一个单独的.js文件

2、接着添加React和React-DOM以及它们的声明文件到package.json文件里做为依赖，执行下面命令：

```bash
npm install --save react react-dom @types/react @types/react-dom
```
（说明： 这个命令使用 @types/前缀 表示要额外获取 React 和 React-DOM 的声明文件。 通常导入像 "react"这样的路径，它会查看react包； 然而，并不是所有的包都包含了声明文件，所以TS还会查看 @types/react包。 之后将不必在意这些了。）

3、最后，我们要添加开发时依赖 awesome-typescript-loader 和 source-map-loader 。

```bash
npm install --save-dev typescript awesome-typescript-loader source-map-loader
```
Loader说明：

awesome-typescript-loader 可以让 Webpack 使用 TypeScript 的标准配置文件 tsconfig.json 编译 TypeScript 代码。

source-map-loader使用 TypeScript 输出的 sourcemap 文件来告诉 webpack 何时生成自己的sourcemaps。 这就允许我们在调试最终生成的文件时就好像在调试TypeScript源码一样。

## 添加TypeScript配置文件
我们想将我们写的源码和必要的TypeScript文件整合到一起，这就需要创建一个tsconfig.json文件。（包含了输入文件列表以及编译选项）

在myTsProj的根目录下新建 tsconfig.json文件，里面配置如下：

```json
{ 
  "compilerOptions":{        
    "outDir": "./dist/",        
    "sourceMap": true,
    "noImplicitAny": true,
    "module": "commonjs",        
    "target": "es5",
    "jsx": "react"    
  },   
  "include": [
    "./src/**/*"
  ]
}
```
## 编写代码
首先在 src/components目录下创建一个Demo.tsx 的文件，代码如下：
```jsx
import * as React from "react";
export interface DemoProps { 
  compiler: string;
  framework: string;
}
export const Demo = (props: DemoProps) => <h1>Hello from {props.compiler} and {props.framework}!</h1>;
```
这个例子使用了无状态的功能组件，我们可以让它更像一点类。
```jsx
import * as React from "react";

export interface DemoProps {
  compiler: string;
  framework: string;
}

// 'DemoProps ' describes the shape of props.
// State is never set so we use the '{}' type.
export class Demo extends React.Component<DemoProps , {}> {
  render() {
    return (<h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>);
  }
}
```
接下来，在src下创建index.tsx文件，代码如下：
```jsx
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Demo } from "./components/Demo";

ReactDOM.render(<Demo compiler="TypeScript" framework="React" />, document.getElementById("app"));
```
注意: 
我们仅仅将Demo组件导入index.tsx。 不同于 "react"或"react-dom"，我们使用Demo.tsx的相对路径 - 这很重要。 如果不这样做，TypeScript只会尝试在 node_modules文件夹里查找。

我们还缺一个页面来显示Demo组件。 在myTsProj根目录创建一个名为index.html的文件，代码如下：

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>React TS Demo!</title>
  </head>    
  <body>        
    <div id="app"></div>        
    <!-- Dependencies -->
    <script src="./node_modules/react/umd/react.development.js"></script>
    <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>        
    <!-- Main -->        
    <script src="./dist/bundle.js"></script>    
  </body>
</html>
```
需要注意一点我们是从node_modules引入的文件。 React和React-DOM的npm包里包含了独立的 .js文件，你可以在页面上引入它们，这里我们为了快捷就直接引用了。 可以随意地将它们拷贝到其它目录下，或者从CDN上引用。
## 创建webpack配置文件
做到这里，我们还差最后一步。
在myTsProj根目录下创建webpack.config.js文件，代码如下：

```json
module.exports = {
  entry: "./src/index.tsx",
  output: {
    filename: "bundle.js",
    path: __dirname + "/dist"
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
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
};
```
之所以添加externals字段，因为我们想要避免把所有的React都放到一个文件里，那样会增加编译时间并且浏览器还能够缓存没有发生改变的库文件。

webpack允许我们使用通过这种方式写的代码库。 通过我们的设置 "react": "React"，webpack会神奇地将所有对"react"的导入转换成从React全局变量中加载。

## 运行
最后我们只需要执行一个命令：
```
webpack
```
在浏览器里打开index.html，应该已经可以用了！ 你可以看到页面上显示着: “Hello from TypeScript and React!”

相信大家对TS已经有一定了解了，可以到官网深入学习TS了。[官网链接](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter)

## Michael 笔记

已实现
- 执行 npx webpack 可以把 src 下面的 ts 打包到 dist 下面的 js, 然后手动打开根目录下面的 index.html 即可打开界面

- npm start 打开 webpack-dev-server 本地服务器，更新代码后，可以热更新，但是界面不会自动渲染：原因：webpack-dev-server 会把编译后的文件直接放在内存中，而不是放在当前的目录下面，所以代码更新后，刷新界面，HTML 引用的还是旧的 dist 目录下面的 js，内容不会变化（可以把引用路径改一下 `<script src="/bundle.js"></script>` ）。稍后把 html 移动到 dist 下面，这样实时打开的 bundle 就是正常的。——已经解决
- html 在根目录显示，并不是在 dist 下面显示，最好使用 html-webpack-plugin 插件处理一下，把 src 中的模板直接拷贝到 dist 打包目录下面，然后自动插入打包后的 bundle.js ，这样避免 HTML 再次引入问题。——已经解决
- 代码中关键的配置，应该自己走一遍，写一下注释

存在的问题

- HTML 中还手动引入 react react-dom 这个应该可以自动实现打包——这里需要 babel 处理等
