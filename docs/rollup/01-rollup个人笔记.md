# 代码案例说明

## demo01 单文件编译

```bash
rollup 入口文件 --file 输出文件 --format 输出格式
```

常用输出格式分为三种：iife cjs umd，表示浏览器环境，node 环境，两者都支持的环境

全部格式："amd", "cjs", "system", "es", "iife" or "umd".

第一个测试文件中，包括了这三个打包的方式，可以查看具体的打包结果

## demo03 多文件编译

多入口多出口文件的配置

~~~js
export default [
  {
    input: './index2.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    }
  },
  {
    input: './index.js',
    output: [
      {
        file: 'bundle-cjs.js',
        format: 'cjs'
      },
      {
        file: 'bundle-es.js',
        format: 'es'
      },
      {
        file: 'bundle-umd.js',
        format: 'umd'
      },
      {
        file: 'bundle-iime.js',
        format: 'iife'
      },
    ]
  },
];

~~~

## demo 04 插件

插件的配置：先安装，然后在配置文件中导入和使用

全部插件介绍：

https://rollupjs.org/guide/en/#plugins

https://rollupjs.org/guide/en/#plugin-development

~~~bash
npm install --save-dev @rollup/plugin-json @rollup/plugin-node-resolve @rollup/plugin-commonjs
npm install --save-dev rollup-plugin-terser
~~~

### @rollup/plugin-json

A Rollup plugin which Converts .json files to ES6 modules. 

将 .json 文件转换为 ES6 模块的 Rollup 插件。

允许导入 json 文件

### @rollup/plugin-node-resolve

A Rollup plugin which locates modules using the Node resolution algorithm, for using third party modules in node_modules

一个使用 Node 解析算法定位模块的 Rollup 插件，用于在 node_modules 中使用第三方模块

### @rollup/plugin-commonjs

A Rollup plugin to convert CommonJS modules to ES6, so they can be included in a Rollup bundle

将 CommonJS 模块转换为 ES6 的 Rollup 插件，因此它们可以包含在 Rollup 包中

### rollup-plugin-terser

Rollup plugin to minify generated es bundle. Uses terser under the hood.

用于缩小生成的 es 包的汇总插件。 在hook下使用更简洁。

```js
import { terser } from "rollup-plugin-terser";
 
export default {
  input: "index.js",
  output: [
    { file: "lib.js", format: "cjs" },
    { file: "lib.min.js", format: "cjs", plugins: [terser()] },
    { file: "lib.esm.js", format: "esm" },
  ],
};
```

### 其他选项

其他的选项参考：https://www.rollupjs.com/guide/big-list-of-options
