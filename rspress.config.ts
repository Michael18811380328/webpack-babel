import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: 'docs',
  title: '前端工程化',
  description: '介绍前端工程化常用工具',
  // set and base builderConfig in server, more info: https://rspress.dev/zh/guide/basic/deploy
  base: '/webpack-babel/',
  outDir: 'dist',
  builderConfig: {
    output: {
      assetPrefix: '/webpack-babel/'
    }
  },
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'babel',
        link: '/babel/01-Babel is what',
        items: [
          { text: '01-Babel is what', link: '/babel/01-Babel is what' },
          { text: '02-Babel Usage Guide', link: '/babel/02-Babel Usage Guide' },
          { text: '03-Babel-Configure', link: '/babel/03-Babel-Configure' },
          { text: '04-Babel-Learn ES2015', link: '/babel/04-Babel-Learn ES2015' },
          { text: '05-babel-preset-env使用指南', link: '/babel/05-babel-preset-env使用指南' },
          { text: '06-babel-preset-env作用', link: '/babel/06-babel-preset-env作用' },
          { text: '07-babel-plugin-transform-runtime 说明', link: '/babel/07-babel-plugin-transform-runtime 说明' },
        ]
      },
      {
        text: 'git',
        link: '/git/BUG-Auto packing the repository in background for optimum performance',
        items: [
          { text: 'BUG-Auto packing the repository in background for optimum performance', link: '/git/BUG-Auto packing the repository in background for optimum performance' },
          { text: 'Nightmare', link: '/git/Nightmare' },
          { text: 'Translation', link: '/git/Translation' },
          { text: 'enzyme 简单实践', link: '/git/enzyme 简单实践' },
          { text: 'git-use-process', link: '/git/git-use-process' },
          { text: 'npm link的使用', link: '/git/npm link的使用' },
          { text: 'npm package-lock的管理', link: '/git/npm package-lock的管理' },
          { text: 'npm 发布两步验证', link: '/git/npm 发布两步验证' },
          { text: 'npm 学习', link: '/git/npm 学习' },
          { text: 'npx', link: '/git/npx' },
          { text: 'yalc', link: '/git/yalc' },
          { text: '如何向开源社区提问题', link: '/git/如何向开源社区提问题' },
          { text: '如何向开源项目提交无法解答的问题', link: '/git/如何向开源项目提交无法解答的问题' },
          { text: '如何有效地报告 Bug', link: '/git/如何有效地报告 Bug' },
        ]
      },
      {
        text: 'mkdocs',
        link: '/mkdocs/Mkdocs-github-blog',
        items: [
          { text: 'Mkdocs-github-blog', link: '/mkdocs/Mkdocs-github-blog' },
          { text: 'Mkdocs-guide', link: '/mkdocs/Mkdocs-guide' },
          { text: 'Mkdocs-mac-env', link: '/mkdocs/Mkdocs-mac-env' },
          { text: 'gitbook-cli 开发电子书', link: '/mkdocs/gitbook-cli 开发电子书' },
          { text: 'gitbook-cli', link: '/mkdocs/gitbook-cli' },
          { text: 'gitbook-editor 编辑器开发电子书', link: '/mkdocs/gitbook-editor 编辑器开发电子书' },
          { text: 'gitbook主题插件', link: '/mkdocs/gitbook主题插件' },
          { text: 'markdown-new-style', link: '/mkdocs/markdown-new-style' },
        ]
      },
      {
        text: 'rollup',
        link: '/rollup/01-rollup个人笔记',
        items: [
          { text: '01-rollup个人笔记', link: '/rollup/01-rollup个人笔记' },
          { text: '02-rollup完全入门指南', link: '/rollup/02-rollup完全入门指南' },
          { text: '03-rollup打包工具基础配置使用详解', link: '/rollup/03-rollup打包工具基础配置使用详解' },
        ]
      },
      {
        text: 'vite',
        link: '/vite/Vite-setting',
        items: [
          { text: 'Vite-setting', link: '/vite/Vite-setting' },
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
          { text: '14-webpack更新版本后报错Starting the development server', link: '/webpack/14-webpack更新版本后报错Starting the development server' },
          { text: '15-webpack设置devServer启动项目为https协议', link: '/webpack/15-webpack设置devServer启动项目为https协议' },
          { text: '16-webpack 打包 antd-mobile 按需加载样式问题', link: '/webpack/16-webpack 打包 antd-mobile 按需加载样式问题' },
          { text: '17-TS-React-Webpack', link: '/webpack/17-TS-React-Webpack' },
          { text: '18-TS项目使用Webpack', link: '/webpack/18-TS项目使用Webpack' },
          { text: '19-webpack 项目配置学习', link: '/webpack/19-webpack 项目配置学习' },
          { text: '20-webpack 项目配置学习2', link: '/webpack/20-webpack 项目配置学习2' },
          { text: '21-webpack 项目配置学习3', link: '/webpack/21-webpack 项目配置学习3' },
        ]
      },
      {
        text: 'webpack-plugins',
        link: '/webpack-plugins/webpack-setting',
        items: [
          { text: 'Preset files are not allowed to export objects', link: '/webpack-plugins/Preset files are not allowed to export objects' },
          { text: 'stalled-webpack3基本使用', link: '/webpack-plugins/stalled-webpack3基本使用' },
          { text: 'stalled-webpack4 babel配置文件', link: '/webpack-plugins/stalled-webpack4 babel配置文件' },
          { text: 'stalled-webpack4DevServer配置项', link: '/webpack-plugins/stalled-webpack4DevServer配置项' },
          { text: 'stalled-webpack4入门介绍', link: '/webpack-plugins/stalled-webpack4入门介绍' },
          { text: 'stalled-webpack4基本配置', link: '/webpack-plugins/stalled-webpack4基本配置' },
          { text: 'stalled-webpack4打包很慢处理', link: '/webpack-plugins/stalled-webpack4打包很慢处理' },
          { text: 'webpack-setting', link: '/webpack-plugins/webpack-setting' },
          { text: 'webpack04-01README', link: '/webpack-plugins/webpack04-01README' },
          { text: 'webpack04-02-README', link: '/webpack-plugins/webpack04-02-README' },
          { text: 'webpack04-03-README', link: '/webpack-plugins/webpack04-03-README' },
          { text: 'webpack3-readme', link: '/webpack-plugins/webpack3-readme' },
          { text: '插件 mini-css-extract-plugin', link: '/webpack-plugins/插件 mini-css-extract-plugin' },
          { text: '插件 react-webpack-template', link: '/webpack-plugins/插件 react-webpack-template' },
          { text: '插件 webpack Code Splitting', link: '/webpack-plugins/插件 webpack Code Splitting' },
          { text: '插件 webpack HappyPack多个进程处理loader', link: '/webpack-plugins/插件 webpack HappyPack多个进程处理loader' },
          { text: '插件 webpack 常用插件', link: '/webpack-plugins/插件 webpack 常用插件' },
          { text: '插件 webpack-howto', link: '/webpack-plugins/插件 webpack-howto' },
          { text: '插件-HappyPack plugin for the loader could not be found', link: '/webpack-plugins/插件-HappyPack plugin for the loader could not be found' },
        ]
      },
    ],
  },
});
