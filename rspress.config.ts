import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: '前端工程化',
  description: '介绍前端工程化常用工具',
  // set and base builderConfig in server, more info: https://rspress.dev/zh/guide/basic/deploy
  base: '/site/webpack/site',
  builderConfig: {
    output: {
      assetPrefix: '/site/webpack/site'
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { 
        text: 'rollup',
        link: '/rollup/28-rollup完全入门指南',
        items: [
          { text: 'Demo 01 Note', link: '/rollup/demo01-note' },
          { text: 'Demo 02 Note', link: '/rollup/demo02-note' },
          { text: 'Demo 03 Note', link: '/rollup/demo03-note' },
          { text: 'Demo 04 Note', link: '/rollup/demo04-note' },
          { text: 'rollup ', link: 'rollup/28-rollup完全入门指南' },
          { text: 'rollup ', link: 'rollup/29-rollup打包工具基础配置使用详解' },
        ]
      },
      { 
        text: 'babel',
        link: '/babel/21-Babel is what',
        items: [
          { text: '21-Babel is what', link: '/babel/21-Babel is what' },
          { text: '22-Babel Usage Guide', link: '/babel/22-Babel Usage Guide' },
          { text: '23-Babel-Configure', link: '/babel/23-Babel-Configure' },
          { text: '24-Babel-Learn ES2015', link: '/babel/24-Babel-Learn ES2015' },
          { text: '25-babel-preset-env使用指南', link: '/babel/25-babel-preset-env' },
          { text: '26-babel-preset-env 作用', link: '/babel/26-babel-preset-env作用' },
          { text: '27-babel-plugin-transform-runtime 说明', link: '/babel/27-babel-plugin-transform-runtime 说明' },
        ]
      },
      {
        text: 'webpack',
        link: '/webpack/01-webpack基本概念',
        items: [
          { text: '01-webpack基本概念', link: '/webpack/01-webpack基本概念' },
          { text: '02-create-react-app入门教程', link: '/webpack/02-create-react-app入门教程' },
          { text: '03-网易webpack配置解析', link: '/webpack/03-网易webpack配置解析' },
          { text: '04-网易webpack编译原理分析', link: '/webpack/04-网易webpack编译原理分析' },
          { text: '05-网易webpack的高级技巧', link: '/webpack/05-网易webpack的高级技巧' },
          { text: '06-网易 webpack 打包工具使用', link: '/webpack/06-网易 webpack 打包工具使用' },
          { text: '07-webpack 官方起步', link: '/webpack/07-webpack 官方起步' },
          { text: '08-webpack5 和 webpack4 的区别有哪些', link: '/webpack/08-webpack5 和 webpack4 的区别有哪些' },
          { text: '09-webpack主要概念', link: '/webpack/09-webpack主要概念' },
          { text: '10-深度解锁Webpack系列(基础篇) 01', link: '/webpack/10-深度解锁Webpack系列(基础篇) 01' },
          { text: '11-深度解锁Webpack系列(进阶篇)02', link: '/webpack/11-深度解锁Webpack系列(进阶篇)02' },
          { text: '12-深度解锁Webpack系列(优化篇)03', link: '/webpack/12-深度解锁Webpack系列(优化篇)03' },
          { text: '13-webpack5 SplitChunksPlugin 实用指南', link: '/webpack/13-webpack5 SplitChunksPlugin 实用指南' },
          { text: '41-webpack更新版本后报错Starting the development server', link: '/webpack/41-webpack更新版本后报错Starting the development server' },
          { text: '42-webpack设置devServer启动项目为https协议', link: '/webpack/42-webpack设置devServer启动项目为https协议' },
          { text: '43-webpack 打包 antd-mobile 按需加载样式问题', link: '/webpack/43-webpack 打包 antd-mobile 按需加载样式问题' },
          { text: '44-TS-React-Webpack', link: '/webpack/44-TS-React-Webpack' },
          { text: '45-TS项目使用Webpack', link: '/webpack/45-TS项目使用Webpack' },
          { text: '46-webpack 项目配置学习', link: '/webpack/46-webpack 项目配置学习' },
          { text: '47-webpack 项目配置学习2', link: '/webpack/47-webpack 项目配置学习2' },
          { text: '48-webpack 项目配置学习3', link: '/webpack/48-webpack 项目配置学习3' },
          { text: 'Preset files are not allowed to export objects', link: '/webpack/Preset files are not allowed to export objects' },
          { text: 'stalled-webpack3基本使用', link: '/webpack/stalled-webpack3基本使用' },
          { text: 'stalled-webpack4 babel配置文件', link: '/webpack/stalled-webpack4 babel配置文件' },
          { text: 'stalled-webpack4DevServer配置项', link: '/webpack/stalled-webpack4DevServer配置项' },
          { text: 'stalled-webpack4入门介绍', link: '/webpack/stalled-webpack4入门介绍' },
          { text: 'stalled-webpack4基本配置', link: '/webpack/stalled-webpack4基本配置' },
          { text: 'stalled-webpack4打包很慢处理', link: '/webpack/stalled-webpack4打包很慢处理' },
          { text: 'webpack-setting', link: '/webpack/webpack-setting' },
          { text: 'webpack04-01README', link: '/webpack/webpack04-01README' },
          { text: 'webpack04-02-README', link: '/webpack/webpack04-02-README' },
          { text: 'webpack04-03-README', link: '/webpack/webpack04-03-README' },
          { text: 'webpack3-readme', link: '/webpack/webpack3-readme' },
          { text: '插件 mini-css-extract-plugin', link: '/webpack/插件 mini-css-extract-plugin' },
          { text: '插件 react-webpack-template', link: '/webpack/插件 react-webpack-template' },
          { text: '插件 webpack Code Splitting', link: '/webpack/插件 webpack Code Splitting' },
          { text: '插件 webpack HappyPack多个进程处理loader', link: '/webpack/插件 webpack HappyPack多个进程处理loader' },
          { text: '插件 webpack 常用插件', link: '/webpack/插件 webpack 常用插件' },
          { text: '插件 webpack-howto', link: '/webpack/插件 webpack-howto' },
          { text: '插件-HappyPack plugin for the loader could not be found', link: '/webpack/插件-HappyPack plugin for the loader could not be found' },
        ]
      },
    ],
  },
});
