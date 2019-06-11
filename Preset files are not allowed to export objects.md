### 报错 Preset files are not allowed to export objects

在使用 webpack 和 babel 编译 react项目时，会报 Preset files are not allowed to export objects 错误。查阅资料，主要是不同版本的 babel 不能兼容使用(版本6和版本7不兼容)。

在高级版本中(>7)这样配置

package.json

~~~json
"@babel/core": "^7.0.0-beta.40",
"@babel/cli": "^7.0.0-beta.40",
"babel-loader": "^8.0.0-beta.0",
"babel-plugin-lodash": "^3.3.2",
"babel-plugin-react-transform": "^3.0.0",
"@babel/preset-react": "^7.0.0-beta.40",
~~~

.bablerc

~~~js
query: {
  presets: ['@babel/react', '@babel/es2015'],
  plugins: ['@babel/proposal-class-properties']
}
~~~

在低级版本中存在漏洞，npm audit 不推荐使用低级版本，所以这里使用高级版本搭建。



参考链接

https://blog.csdn.net/cyyy1223/article/details/78867941

https://segmentfault.com/a/1190000016783625

https://www.html.cn/archives/9427

上面说明react+webpack+babel 搭建基础流程

https://blog.csdn.net/weixin_36185028/article/details/81117730

说明打包成一个文件、全部文件、部分文件的配置

https://www.cnblogs.com/tugenhua0707/p/9452471.html

说明不同的依赖包的作用和配置

https://www.e-learn.cn/index.php/content/wangluowenzhang/1121968

说明高级版本的配置