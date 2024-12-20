# JS打包工具rollup——完全入门指南

统计信息：字数 48147  阅读97分钟

官网教程

https://rollupjs.org/guide/en/

https://www.rollupjs.com/guide/tutorial

https://www.rollupjs.com/guide/big-list-of-options

博客链接：https://segmentfault.com/a/1190000010628352

发布于 2017-08-12（以最新的官方文档为准）

文档没有具体看（部分插件版本更新了）

## 前言

最近在做一个提供给浏览器和node同时使用的js的url模板工具类，在用什么打包工具上纠结了一段时间，正好有一天在知乎上看到了关于rollup的介绍，在自己试了试之后，就决定用rollup.js来打包自己的工具类了。

这篇文章主要是为了让对rollup.js也有兴趣的同学能够快速入门rollup的使用方式而写的，文章除了开始对rollup.js的基本介绍之外，主要用多个demo来介绍rollup.js的不同使用方法，以及介绍一些比较常用的rollup插件。读者可以选择自己有兴趣的部分查看。

[文章博客链接](https://link.segmentfault.com/?enc=stSl1SdmyWPkNFfQJOJB9g%3D%3D.n3CqV0SR%2FFRMLV1OfvaOkve1P6nn5vRja0kdHDYO4qs2VYefJG4gNrxjS%2BC7Zlfyh2xc5wkaux5dUJhk4gvEQl%2BN96yFSnStl5Hf7pcLaCCNTtxmKDl2zF0mMdmWVyI8bDSTRli55WqAzn7zLDYiQYqtETyfBW0HERNIl5Wq8M6g9Gm1eAZ5tpSFut1NJHHc)

本教程相关的所有demo都已上传到github，[rollup-demos](https://link.segmentfault.com/?enc=au2%2BHs1WWDpbS10kEZqmiw%3D%3D.IoKA0wo22faXhnqpbAE1u5r4B0upu6DLiUJgo3dghN6JroeDi0s1zW%2FZ5jLcryts)，欢迎star。

## rollup.js简介

首先简单介绍一下rollup.JS。根据官方的介绍，rollup.js是一个模块打包工具，可以帮助你从一个入口文件开始，将所有使用到的模块文件都打包到一个最终的发布文件中（极其适合构建一个工具库，这也是我选择用rollup来打包的原因）。

rollup.js有两个重要的特性，其中一个就是它使用ES6的模块标准，这意味着你可以直接使用`import`和`export`而不需要引入babel（当然，在现在的项目中，babel可以说是必用的工具了）。

rollup.js的另一个重要特性叫做'tree-shaking'，这个特性可以帮助你将无用代码（即没有使用到的代码）从最终的生成文件中删去。举个例子，我在A.js文件中定义了A1和A2两个方法，同时在B文件中引入了这两个方法，但是在B文件中只引入了A文件中的A1方法，那么在最后打包B文件时，rollup就不会将A2方法引入到最终文件中。（这个特性是基于ES6模块的静态分析的，也就是说，只有export而没有import的变量是不会被打包到最终代码中的）

## rollup.js实例

### demo0 开始使用rollup

初始化一个工程，创建一个依赖模块文件lib.js和入口文件index.js。

```javascript
export function logA() {
    console.log('function logA called')
}

export function logB() {
    console.log('function logB called')
}
import { logA } from './lib'

logA()
```

现在我们要把lib.js和index.js打包成dist.js，首先要做的就是安装rollup.js。

在这里我们有两种安装方法：

1. 全局安装：

打开你的命令行，输入`npm install rollup -g`，等待rollup安装完毕。安装完成之后，试着输入`rollup -v`来查看一下rollup是否安装成功了

![查看rollup版本](https://segmentfault.com/img/bVSKQD?w=518&h=63)

成功安装完rollup之后，进入到工程目录下，输入打包命令`rollup index.js -o dist.js`，index.js 是我们的入口文件， -o 表示输出文件的路径，在 -o 后面跟着的 dist.js 就是我们要生成的最终打包文件了。（其实这里本来应该加上一个参数-i，用来表示入口文件的路径，但rollup是会把没有加参数的文件默认为是入口文件，因此我们在这里省略了这个参数）

![使用全局rollup进行打包](https://segmentfault.com/img/bVSKQE?w=504&h=73)

显示出这条信息之后，我们发现目录下已经多出了一个 dist.js 文件，打开文件，我们发现里面的代码是这样的

```ada
function logA() {
    console.log('function logA called');
}

logA();
```

此时我们就已经完成了打包作业，可以将dist.js引入到HTML文件或是node模块中了

1. 项目本地安装：

进入到项目目录，打开命令行输入`npm install rollup --save-dev`，把rollup加入到开发依赖中，然后在命令行中输入`./node_modules/.bin/rollup index.js -o dist.js`

![使用项目本地rollup进行打包](https://segmentfault.com/img/bVSKQ9?w=494&h=75)

或者在`package.json`文件中添加npm scripts命令`"build": "rollup index.js -o dist.js"`，在命令行中输入`npm run build`来进行打包

![使用项目本地rollup进行打包](https://segmentfault.com/img/bVSKRe?w=543&h=133)

在打包完成之后，我们查看一下效果，新建一个index.html文件，在这个文件中引入我们打包出来的dist.js文件

```xml
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>rollup 打包测试</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
        <script src="./dist.js"></script>
    </body>
</html>
```

用浏览器打开index.html文件，打开控制台，我们可以看到控制台上输出了一行文字

![rollup打包文件测试](https://segmentfault.com/img/bVSKRf?w=428&h=124)

使用命令行运行dist.js文件，我们也可以看到命令行中输出了一行文字

![rollup打包文件测试](https://segmentfault.com/img/bVSKRm?w=496&h=65)

这说明我们的打包文件dist.js是可以运行的，打包成功。

**PS：**

1. 接下来的demo中，默认在项目内安装了rollup
2. 接下来的demo中，非必要情况下不会对打包结果进行运行结果测试，读者若需要验证打包效果，请自己编写其他测试代码。

## demo1 使用rollup进行模块化打包

在之前打包的过程中，命令行中输出了一行`No format option was supplied – defaulting to 'es'`，这表示rollup并没有收到任何模块化的格式指令，因此会用默认的es模块标准来对文件进行打包。

如果在demo0中的index.js文件中把`logA()`改成`export default logA()`，那么rollup最后的打包结果就会是

```javascript
function logA() {
    console.log('function logA called');
}

var index = logA();

export default index;
```

显然这样的代码是不能直接在浏览器端和node端运行的，我们需要把原先的ES6模块转化成浏览器和node支持的形式。

那么要去哪里找rollup把ES6代码转化成其他形式的方法呢？这里有两个方案，一是去[rollup的官网](https://link.segmentfault.com/?enc=Hv4Gp2NV7yQkwAe6zj2lpQ%3D%3D.oKuW0JiDNnhSwBH2WrdX%2BKZHpeUJEL2MTU70ZKp%2FIyg%3D)找相关的资料，二是使用rollup命令行的帮助命令，看看能不能找到相关的参数

我们使用rollup命令行的帮助命令，在命令行中输入`rollup -h`

![rollup命令行帮助](https://segmentfault.com/img/bVSKRv?w=656&h=290)

在这里我们可以看到类似版本号，帮助，使用配置文件等一系列参数。在这里我们可以找到`-f`这个参数，他的说明是输出的类型（amd，cjs，es，iife，umd），从括号里的内容我们可以看出，使用这个参数可以确定打包完后的文件的模块处理方式。（如果你还不知道这几种模块之间的区别，建议先去找一下相关的资料学习一下）

接下来我们用rollup来打包一下，在demo0中的index.js文件里将`logA()`改成`export default logA()`，在package.json文件中写好不同模块的打包命令

```n1ql
"build:amd": "rollup index.js -f amd -o ./dist/dist.amd.js",
"build:cjs": "rollup index.js -f cjs -o ./dist/dist.cjs.js",
"build:es": "rollup index.js -f es -o ./dist/dist.es.js",
"build:iife": "rollup index.js -f iife -n result -o ./dist/dist.iife.js",
"build:umd": "rollup index.js -f umd -n result -o ./dist/dist.umd.js",
"build:all": "npm run build:amd && npm run build:cjs && npm run build:es && npm run build:iife && npm run build:umd"
```

在这里我们发现在设置模块为iife（立即执行函数）和umd时，还加上了一个参数`-n`，这是因为我们将logA()的结果设置为模块的输出结果，那么在使用iife和umd时，需要事先设定模块的名称，才能让其他人通过这个模块名称引用到你的模块的输出结果。

在命令行中输入`npm run build:all`，运行所有打包命令，查看效果

![demo1打包结果](https://segmentfault.com/img/bVSKRB?w=153&h=162)

可以看到已经输出了5种不同模块标准的打包文件，由于字数原因，在这里我们只查看一个打包文件（dist.iife.js）的内容

```javascript
var result = (function () {
'use strict';

function logA() {
    console.log('function logA called');
}

var index = logA();

return index;

}());
```

可以看到所有代码都被打包到了一个立即执行函数中，并且将函数的返回值（模块的输出内容）赋值给了一个全局变量，而这个全局变量的名称就是我们之前设置的模块名称。

**PS：** 使用amd模块打包方式时，若不指定模块名称，则会打包成匿名函数，若想打包成一个具名函数，则需要使用`-u`或`--id`来指定具名函数名称。

除了-f之外，还有许多其他的参数可以使用，看到这里可能有些同学会觉得麻烦了，这么多参数用起来好麻烦，每次都要输一长串的命令，那么有没有更好的方法来控制rollup的参数配置呢？

当然有，接下来我们就尝试使用配置文件来控制rollup打包。

## demo2 使用配置文件来进行rollup打包

创建一个demo2，沿用之前demo1的内容，我们在demo2的项目下创建一个文件，取名为`rollup.config.js`，这个文件就是rollup的配置文件了，rollup根据配置文件的输出配置来进行打包，接下来我们在配置文件中输入配置代码:

```routeros
export default {
  entry: 'index.js',
  format: 'cjs',
  dest: './dist/dist.js'
}
```

`entry`表示打包的入口文件，`format`表示要打包成的模块类型，`dest`表示输出文件的名称路径

**PS：** 若使用iife或umd模块打包，需要添加属性`moduleName`，用来表示模块的名称；若用amd模块打包，可以配置amd相关的参数（使用umd模块模式时，也会使用到amd相关配置参数）：

```js
amd: {
    id: 'amd-name',   // amd具名函数名称
    define: 'def'     // 用来代替define函数的函数名称
}
```

在这里我们发现配置文件也是使用了ES6语法，这是因为rollup可以自己处理配置文件，所以能够直接用ES6的模块输出（当然，你也可以选择使用node的`module.exports`方式来输出配置。

在package.json文件中编写npm scripts命令

```json
"build": "rollup -c"
```

`-c`这个参数表示使用配置文件来进行打包，若后面没有指定使用的配置文件路径，则使用默认的配置文件名称`rollup.config.js`。

在命令行中输入`npm run build`，执行打包，可以看到生成了打包文件dist.js

```javascript
'use strict';

function logA() {
    console.log('function logA called');
}

var index = logA();

module.exports = index;
```

**进阶：** 当rollup配置文件最终输出的不是一个对象而是一个数组时，rollup会把每一个数组元素当成一个配置输出结果，因此可以在一个配置文件内设置多种输出配置

例如，我们添加一个indexB.js文件，在这个文件中我们将logA替换为logB，并将rollup配置文件改为：

```mel
export default [{
  entry: 'index.js',
  format: 'cjs',
  dest: './dist/distA.js'
},{
  entry: 'indexB.js',
  format: 'iife',
  moduleName: 'indexB',
  dest: './dist/distB.js'
}]
```

运行打包命令，发现在dist目录下生成了distA.js和distB.js两个文件，说明多项配置打包成功。

除了上面这种输出一个配置数组之外，你还可以通过配置target属性来输出多个打包文件：

```sqf
export default {
  entry: 'index.js',
  targets: [{
      dest: 'dist/bundle.cjs.js',
      format: 'cjs'
    },
    {
      dest: 'dist/bundle.umd.js',
      moduleName: 'res',
      format: 'umd'
    },
    {
      dest: 'dist/bundle.es.js',
      format: 'es'
    },
  ]
}
```

这样配置会在dist目录下面输出`bundle.cjs.js`，`bundle.umd.js`和`bundle.es.js`三个打包文件，同时umd模块的名称会被定义成res。

## demo3 监听文件变化，随时打包

我们在开发过程中，需要频繁对源文件进行修改，如果每次都自己手动输一遍打包命令，那真的是要烦死。因此，我们选择使用rollup提供的监听功能，安装`rollup-wacth`模块，再在rollup命令后面加上`-w`参数，就能让rollup监听文件变化，即时打包。

安装watch包：

```sql
npm i rollup-watch --save-dev
// or
yarn add rollup-watch --dev
```

编写npm scripts：

```json
"dev": "rollup -c -w"
```

执行`npm run dev`，看到下面的提示：

![rollup 监听文件变化](https://segmentfault.com/img/bVSKTL?w=518&h=142)

好了，这个时候你就可以随便修改你的源文件了，rollup会自动为你打包的。

**PS：** 若是你不想监听某些文件，只要在配置文件中加上

```applescript
watch: {
    exclude: ['path/to/file/which/you/want/to/ignore']
}
```

就行了,其中的exclude表示你想要忽略的文件的路径（支持glob模式匹配)

## demo4 是时候写ES6了

ES6可以说是现代JS开发100%会用到的技术了，rollup虽然支持了解析`import`和`export`两种语法，但是却不会将其他的ES6代码转化成ES5代码，因此我们在编写ES6代码的时候，需要引入插件来支持ES6代码的解析。

1. 安装插件和你需要的babel preset：

```sql
npm i rollup-plugin-babel babel-preset-es2015 --save-dev
// or
yarn add rollup-plugin-babel babel-preset-es2015 --dev
```

1. 创建.babalrc文件：

```prolog
{
  "presets": [
    ["es2015", {
        "modules": false
    }]
  ]
}
```

之所以使用`modules:false`这个参数，是因为rollup默认是通过ES6模块语法来解析文件间的依赖，rollup默认是不支持解析common.js的模块规范的（怎么让rollup支持我会在接下来的demo中讲解），因此需要让babel不转化模块相关的语法，不然rollup在使用过程中会报错。

1. 编写rollup配置文件：

```js
import babel from 'rollup-plugin-babel';

export default [{
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
  ]
}]
```

rollup的配置文件的plugins属性可以让你添加在rollup打包过程中所要用到的插件，但是要注意的是，**插件的添加顺序决定了它们在打包过程中的使用顺序**，因此要注意配置文件的插件使用顺序。

1. 编写ES6代码

在这里我们新建三个文件，两个类Person和Man和一个入口文件index.js

```javascript
export default class Person {
    constructor (name, gender = '男') {
        this.name = name
        this.gender = gender
    }

    say () {
        console.log(`我的名字是${this.name}，是一个${this.gender}生`)
    }
}
import Person from './Person'

export default class Man extends Person {
    constructor (name) {
        super(name, '男')
    }
}
import Man from './src/Man'

new Man('KainStar').say()
```

1. 运行打包命令`npm run build`

![rollup babel打包1](https://segmentfault.com/img/bVSKUR?w=753&h=160)

可以看到rollup输出了一段提示文字，我们先不去管它，先看看打包出来的文件能不能运行，执行`node dist/dist.js`

![rollup babel打包2](https://segmentfault.com/img/bVSKUZ?w=315&h=58)

可以看到代码运行成功了，那么我们回来继续看之前的提示文字，它的意思是'classCallCheck'这个babel helper函数使用了多次，rollup推荐我们使用external-helpers这个插件或es2015-rollup这个babel-preset来简化打包出来的代码。

我们查看一下打包出来的dist.js文件，发现_classCallCheck这个函数被定义了两次，分别被取名为_classCallCheck和_classCallCheck$1，这样的代码肯定是可以简化的，因此我们引入external-helpers这个插件：

```sql
npm i babel-plugin-external-helpers --save-dev
// or
yarn add babel-plugin-external-helpers --dev
```

修改.babelrc文件为

```prolog
{
    "presets": [
        ["es2015", {
            "modules": false
        }]
    ],
    "plugins": [
        "external-helpers"
    ]
}
```

**或者**在配置文件中使用babel配置

```css
plugins: [
    babel({
        plugins: ['external-helpers']
    })
]
```

**注意！** 在rollup-plugin-babel的官方github仓库中有一段配置是这样的：

```yaml
plugins: [
    babel({
      plugins: ['external-helpers'],
      externalHelpers: true
    })
]
```

这段配置的使用要求是你需要设置全局的`babelHelpers`对象，以此来将打包文件中的babel相关代码删除，所以一般情况下不需要使用`externalHelpers`这个属性。

**PS：** 你也可以使用babel-preset-es2015-rollup这个包（搭配babel-core），它集成了babel-preset-es2015，babel-plugin-transform-es2015-modules-commonjs和babel-plugin-external-helpers三个模块，使用起来更加方便，只要将.babelrc文件修改成`{ "presets": ["es2015-rollup"] }`就可以使用了。

## demo5 解析cjs，打包第三方模块

有时候我们会引入一些其他模块的文件（第三方的或是自己编写的），但是这些第三方的模块为了能够直接使用，往往不是ES6模块而是用commonjs的模块方式编写的，这个时候我们需要将commonjs的模块转化为ES6模块，这样才能让rollup进行正确的解析。

1. 解析commonjs

解析commonjs需要引入一个rollup插件——`rollup-plugin-commonjs`

安装插件

```sql
npm i rollup-plugin-commonjs --save-dev
// or
yarn add rollup-plugin-commonjs --dev
```

在配置文件中配置插件

```js
import commonjs from 'rollup-plugin-commonjs'

export default {
  entry: 'index_cjs.js',
  format: 'iife',
  dest: './js/dist_cjs.js',
  plugins: [
    commonjs()
  ]
}
```

编写cjs模块的文件

```javascript
exports.logA = function logA() {
  console.log('function logA called')
}

exports.logB = function logB() {
  console.log('function logB called')
}
```

执行打包，可以看到打包成功，也没有输出任何提示信息

![rollup cjs打包](https://segmentfault.com/img/bVSKVi?w=525&h=95)

1. 打包第三方模块

在打包第三方模块的过程中，rollup无法直接解析npm模块，因此需要引入插件`rollup-plugin-node-resolve`并配合之前的commonjs插件来解析这些第三方模块

安装插件和第三方模块

```crmsh
npm i rollup-plugin-node-resolve lodash --save-dev
// or
yarn add rollup-plugin-node-resolve lodash --dev
```

在配置文件中配置插件

```js
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index_module.js',
  format: 'iife',
  dest: './js/dist_module.js',
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}
```

jsnext表示将原来的node模块转化成ES6模块，main和browser则决定了要将第三方模块内的哪些代码打包到最终文件中。

由于[commonjs](https://link.segmentfault.com/?enc=UZQSxMK%2BU%2FO%2FFJxppk60SQ%3D%3D.L4noVYfBNpszlbPSBYeVT%2FA8kiEhhM%2F0U0I8uMqHnBN4caGqAfoiECGktNWpYmbUTXgupmg3n8uDdZIpUdrHLg%3D%3D)和[node-resolve](https://link.segmentfault.com/?enc=0nVzyFCAIGBsugL75aXqCw%3D%3D.ibYkbQk2DVWyurKVZBjezOqVx%2F9KjEIRzemGnzEA8NdHRDlu3wEyhFBPNss9JtELoP8vh%2BV6VYeT4FR2LPNZ%2BQ%3D%3D)中的配置属性很多，因此不一一解释，希望了解更多的同学可以去官方仓库查看说明。

编写入口文件

```javascript
import compact from 'lodash/compact'

const array = [0, 1, false, 2, '', 3]
const compctedArray = compact(array)
console.log(compctedArray)
```

在这里我们只引用了lodash中的compact方法，那么在最终代码里，应该也只会添加compact方法的代码。

执行打包命令，查看打包出来的文件：

```js
(function () {
'use strict';

/**
 * Creates an array with all falsey values removed. The values `false`, `null`,
 * `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to compact.
 * @returns {Array} Returns the new array of filtered values.
 * @example
 *
 * _.compact([0, 1, false, 2, '', 3]);
 * // => [1, 2, 3]
 */
function compact(array) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var compact_1$1 = compact;

const array = [0, 1, false, 2, '', 3];
const compctedArray = compact_1$1(array);
console.log(compctedArray);

}());
```

确实只添加了compact方法的代码，而没有将lodash全部引入。

## demo6 不要打包到一个文件，为rollup设置外部模块和全局变量

在平时的开发中，我们经常会引入其他的模块，但是在使用的时候，我们又不想把它们打包到一个文件里，想让他们作为单独的模块（或文件）来使用，方便浏览器端进行缓存，这个时候就需要使用配置文件中的`external`属性了

我们**在demo5的基础上**，把jquery安装到第三方模块中

```bash
npm i jquery --save-dev
// or
yarn add jquery --dev
```

将配置文件改成

```js
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './js/dist.js',
  external: ['jquery'],
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs()
  ]
}
```

external用来表示一个模块是否要被当成外部模块使用，属性的值可以是一个字符串数组或一个方法，当传入的是一个字符串数组时，所有数组内的模块名称都会被当成是外部模块，不会被打包到最终文件中

当传入的是一个方法时，方法有一个参数id，表示解析的模块的名称，我们可以自定义解析方式，若是要当做外部模块不打包到最终文件中，则返回true，若要一起打包到最终文件中，则返回false

在这里我们把jquery当成一个外部模块，执行打包命令：

![rollup 添加外部模块](https://segmentfault.com/img/bVSKVx?w=723&h=136)

检查打包出来的文件，我们发现lodash的compact方法依旧被打包进了最终文件中，但是jquery却没有被打包进去，而是以$的全局变量形式被传入到了立即执行函数中。

在这里rollup又给我们输出了一条提示信息，意思是我们没有在配置文件中给外部模块jquery设置全局变量名称，因此rollup自己猜测了一个名称$，当成是依赖的全局变量名。

如果直接使用全局的$的话，可能会因为变量$被其他引入的代码覆盖而报错，因此我们要将$替换为不容易冲突的jQuery变量，在配置文件中添加`globals`属性：

```css
globals: {
    jquery: 'jQuery'
}
```

globals的值是一个对象，key表示使用的模块名称（npm模块名），value表示在打包文件中引用的全局变量名，在这里我们就是把jquery模块的全局变量名设置为jQuery，重新打包

在重新打包出来的文件中，我们发现最后传入的参数已经由`$`变为了`jQuery`，而且rollup也没有输出提示信息。

## demo7 打包node内置模块

有时候我们想要在浏览器端使用node自带的一些内置模块，一般情况下会使用`browserify`这个工具来打包，但是browserify打包出来的文件实在太大，因此我们用rollup选择性地导入我们需要的node内置模块

安装插件

```crmsh
npm i rollup-plugin-node-builtins --save-dev
// or
yarn add rollup-plugin-node-builtins --dev
```

**PS：** node-builtins对不同的node内置模块支持不同，有些模块可能需要使用其他的插件（例如[rollup-plugin-node-globals](https://link.segmentfault.com/?enc=JHkG6C6WK8UjmeEIFdBRfg%3D%3D.xVFKncO4qNsJh%2B7IP3Q9vNpxAtq3beX8YJKCl0EucJLr6FxzEzUpN%2FtyIYQMjVTg76tiv4kH%2Fz0nFQF%2FRhj4nA%3D%3D)）才能正常打包，具体的支持情况可以查看node-builtins的[官方仓库](https://link.segmentfault.com/?enc=oGqWgwmXAl8zuDCmdohsXg%3D%3D.4ZTyuPmIe7HAG9ze1h98Bb04PAA6gmJAn87Iop2phhq4SLx1fO8R8JlAG9eluzNmq1Zoo3xSgZlkZaCn8fuSlQ%3D%3D)。

编写配置文件

```js
import builtins from 'rollup-plugin-node-builtins'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    builtins()
  ]
}
```

编写入口文件

```js
import { join } from 'path'

const path_base = 'E://node'
const path_joined = join(path_basem, 'bin')
console.log(path_joined)
```

在这里我们使用node内置的path模块，运行打包命令，发现dist.js文件中引入了额外的100多行代码，这100多行代码就实现了path模块的join方法供我们使用。

**PS：** 我建议，如果不是必要的情况，最好能够使用其他人编写的第三方实现库或自己造轮子实现，而不是使用node内置的模块，因为在引用某些模块时，node-builtins可能会引入过多的代码，这样会大大增加最后打包的文件的大小，使用他人的第三方库或自己的实现可控性更高

## demo8 配合CDN来使用rollup

有时候我们可能会使用CDN服务器上的js文件，但是又不想在本地安装一个相同的模块（也有可能没有对应的模块），可能在版本升级的时候会产生一些问题，这个时候我们就需要使用rollup的`paths`属性了，这个属性可以帮助你把依赖的代码文件地址注入到打包之后的文件里。

编写配置文件

```dart
export default {
  entry: 'index.js',
  format: 'amd',
  dest: './dist/dist.js',
  external: ['jquery'],
  paths: {
    jquery: 'https://cdn.bootcss.com/jquery/3.2.1/jquery.js'
  }
}
```

在这里我们要使用cdn上的jquery文件，paths属性的值可以是一个对象或用法与`external`属性方法相似的方法（只是返回的不是boolean值而是文件的地址）。若使用对象来表示，则key值为需要引入的模块名称，value值为对应的文件地址

编写源文件

```js
import $ from 'jquery'

$('#p').html('rollup 使用paths属性配合CDN')
```

执行打包命令，最后打包出来的文件内容是：

```js
define(['https://cdn.bootcss.com/jquery/3.2.1/jquery.js'], function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

$('#p').html('rollup 使用paths属性配合CDN');

});
```

可以看到rollup已经把我们需要的CDN地址作为依赖加入到了打包文件中。

## demo9 最小化你的代码

代码发布时，我们经常会把自己的代码压缩到最小，以减少网络请求中的传输文件大小。

rollup的插件`rollup-plugin-uglify`就是来帮助你压缩代码的，我们接下来就用这个插件来压缩一下我们的代码

```sql
npm i rollup-plugin-uglify --save-dev
// or
yarn add rollup-plugin-uglify --dev
```

编写配置文件

```js
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    uglify()
  ]
}
```

运行打包命令，查看dist.js文件，发现代码已经被压缩了

但是，压缩过的代码在debug时会带来很大的不便，因此我们需要在压缩代码的同时生成一个sourceMap文件

幸运的是，rollup自己就支持sourceMap文件的生成，不需要我们去引入其他插件，只需要在配置文件中加上：

```yaml
sourceMap: true
```

就可以了。

重新打包，我们发现不仅生成了dist.js.map文件，而且dist文件最后加上了一行`//# sourceMappingURL=dist.js.map`，并且在浏览器中可以正确加载源文件

![rollup sourceMap](https://segmentfault.com/img/bVSKVA?w=583&h=244)

**PS：** 若是将sourceMap属性的值设置为`inline`，则会将sourceMap的内容添加到打包文件的最后。

## demo10 为你的代码添eslint检查

在大型工程的团队开发中，我们需要保证团队代码风格的一致性，因此需要引入eslint，而且在打包时需要检测源文件是否符合eslint设置的规范，若是不符合则抛出异常并停止打包。在这里我们使用rollup的eslint插件`rollup-plugin-eslint`:

安装插件

```sql
npm i eslint rollup-plugin-eslint --save-dev
// or
yarn add eslint rollup-plugin-eslint --dev
```

编写eslint配置文件`.eslintrc`

```json
{
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": false
    },
    "sourceType": "module"
  },
  "rules": {
    "semi": ["error","never"]
  }
}
```

在这里我们强制要求不使用分号，然后在源文件中加上一个分号

```js
foo(element);
```

编写rollup配置文件

```js
import eslint from 'rollup-plugin-eslint';

export default {
  entry: './src/index.js',
  format: 'iife',
  dest: './dist/dist.js',
  plugins: [
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**']
    })
  ]
}
```

eslint插件有两个属性需要说明：throwOnError和throwOnWarning设置为true时，如果在eslint的检查过程中发现了error或warning，就会抛出异常，阻止打包继续执行（如果设置为false，就只会输出eslint检测结果，而不会停止打包）

执行打包命令，发现eslint在输出了检查结果之后抛出了异常，而且dist.js文件也没有生成

![rollup eslint抛出异常](https://segmentfault.com/img/bVSKV2?w=753&h=443)

删除index.js文件中的分号，重新打包，发现打包成功

**进阶：** 在平时的开发过程中，我们经常会使用IDE或编辑器的eslint插件，以便提早发现问题，但是有时候这些插件会去检查打包完的文件，导致你的提示框里一直会有eslint检测到错误的消息

我们现在有两种解决方案，一是创建一个`.eslintignore`文件，将打包文件加进去，让eslint忽略这个文件

还有一种就是让rollup在打包文件的开始和最后自动生成注释来阻止eslint检测代码，使用这种方法时，需要使用rollup配置文件的两个属性：banner和footer，这两个属性会在**生成文件**的开头和结尾插入一段你自定义的字符串。我们利用这个属性，在打包文件的开头添加`/*eslint-disable */`注释，让eslint不检测这个文件。

添加banner和footer属性

```vbnet
banner: '/*eslint-disable */'
```

重新打包，我们发现打包文件的开头被插入了这段注释字符串，而且eslint插件也不报dist.js文件的错了

```javascript
/*eslint-disable */
(function () {
'use strict';

// 具体代码

}());
```

## demo11 控制开发环境和生产环境下的配置

1. 配置文件的开发/生产环境配置

有时候我们会需要区分开发环境和生产环境，针对不同的打包要求输出不同的打包配置，但是我们又不想写`rollup.config.dev.js`和`rollup.config.prod.js`两个文件，因为可能两者之间的区别只是一个uglify插件。

因此，我们就需要用变量来控制配置文件的输出内容，rollup命令行给我们提供了一个设置环境变量的参数`--environment`，在这个参数后面加上你需要设置的环境变量，不同变量间用逗号分隔，用冒号后面的字符串表示对应变量的值（若不加冒号，则默认将值设为字符串true）：

在package.json文件中编写对应的npm scripts命令：

```json
"dev": "rollup -c --environment NODE_ENV:development",
"build": "rollup -c --environment NODE_ENV:production"
```

最后修改我们的rollup配置文件

```javascript
import uglify from 'rollup-plugin-uglify'

let isProd = process.env.NODE_ENV === 'production'

// 通用的插件
const basePlugins = []
// 开发环境需要使用的插件
const devPlugins = []
// 生产环境需要使用的插件
const prodPlugins = [uglify()]

let plugins = [...basePlugins].concat(isProd ? prodPlugins:devPlugins)
let destFilePath = isProd ? './dist/dist.min.js': './dist/dist.js'

export default {
  entry: 'index.js',
  format: 'iife',
  dest: destFilePath,
  sourceMap: isProd,
  plugins: plugins
}
```

我们分别运行两个npm scripts命令，查看打包的结果：

![rollup 开发环境和生产环境打包结果](https://segmentfault.com/img/bVSKWa?w=245&h=109)

1. 源文件开发/生产环境信息注入

上面是在配置文件里通过变量来改变输出的配置类型，但是我们有时候需要将生产环境信息添加到源文件里，这个时候就需要使用rollup的配置属性intro和outro了

如果说banner和footer是在文件开始和结尾添加字符串，那么intro和outro就是在被打包的代码开头和结尾添加字符串了，以iife模式来举例，如果我们配置了这四个属性，那么输出结果就会是：

```javascript
// banner字符串
(function () {
'use strict';
// intro字符串

// 被打包的代码

// outro字符串
}());
// footer字符串
```

这样的形式

下面我们实际使用一下，在index.js文件里加上一段需要依赖的代码

```js
if (DEVELOPMENT) {
    console.log('处于开发环境')
} else {
    console.log('处于生产环境')
}
```

然后在我们的rollup配置文件里添加：

```erlang-repl
intro: 'var DEVELOPMENT = ' + !isProd,
```

这样，当我们最后生成的代码时，就会输出开发环境或生产环境的提示：

![rollup 开发环境和生产环境信息打包结果](https://segmentfault.com/img/bVSKWm?w=497&h=213)

1. 源文件开发/生产环境信息替换

有时候我们会把开发/生产环境的信息直接写在源文件里面，这个时候用intro来注入代码的方式就不适合了。这个时候我们就需要使用`rollup-plugin-replace`插件来对源代码的变量值进行替换：

安装插件

```bash
npm i rollup-plugin-replace --save-dev
// or
yarn add rollup-plugin-replace --dev
```

编写配置文件

```js
const basePlugins = [replace({
  DEVELOPMENT: !isProd
})]

// 将intro属性注释掉
// intro: 'var DEVELOPMENT = ' + !isProd,
```

这里我们使用replace插件，以key-value对象的形式，将`DEVELOPMENT`的值替换为`!isProd`的值

执行打包命令，并检查打包结果：

![rollup 开发环境和生产环境信息打包结果](https://segmentfault.com/img/bVSKWr?w=591&h=448)

**进阶：** replace除了直接使用key-value的形式替换对应key同名变量的方法之外，还可以通过配置`delimiters`参数来实现模板功能：

配置replace插件参数

```apache
VERSION: '1.0.0',
delimiters: ['{{', '}}']
```

通过这个配置，在打包过程中，`{{VERSION}}`会被替换成`1.0.0`

在index.js文件内添加相关代码

```js
var version = '{{VERSION}}'
console.log('版本 v' + version)
```

打包的结果

```js
var version = '1.0.0';
console.log('版本 v' + version);
```

## demo12 使用rollup的API

有时候我们会需要在打包的前后执行一些其他的代码，但是又不想引入其他构建工具（例如gulp），那么就可以使用rollup提供的node API来编写你自己的打包流程。

rollup模块只提供了一个rollup函数，这个函数的参数和我们编写配置文件时导出的参数不同，减少了很多配置属性，留下来的主要是一些输入相关的配置。（具体的配置属性可以查看rollup wiki的[javascript API](https://link.segmentfault.com/?enc=V62VLCuPYH99jChH0wPlzw%3D%3D.tKnVVDRNpEvgdkHZ2Ng1s4Zd4dvkrj%2F8vPnJ3plVvEDIINNs2woddYjrtr0ipjSvd89U2dYs2VMfVSr4Ze6YrA%3D%3D)一节）

执行这个函数返回的是一个Promise，并且在then方法中提供一个bundle对象作为参数，这个对象保存了rollup对源文件编译一次之后的结果，而且提供了`generate`和`write`两个方法

write方法提供了编译并将打包结果输出到文件里的功能，返回的是一个没有参数的Promise，可以让你自定义接下来执行的代码

generate方法是只提供了编译的功能，返回一个Promise，这个Promise有一个对象参数，包含了code（编译完之后的代码）和map（分析出来的sourceMap对象）两个属性，一般用在插件开发中

write和gengerate方法都接受有编译相关属性的对象作为传入的编译参数，而write方法还额外接受`dset`属性作为导出文件的名称。

在这里我们只使用write方法来编写一个为所有模块类型打包，并输出打包完毕提示的文件，至于generate的使用方法我们会放在编写插件一节中介绍。

```javascript
const rollup = require('rollup').rollup

rollup({
  entry: 'index.js'
}).then(bundle => {

  // 保存所有Promise的列表
  let writePromiseList = []
  // 声明所有需要打包的模块类型
  let moduleTypesList = ['es','cjs','amd','umd','iife']

  moduleTypesList.forEach(function(moduleType) {
    writePromiseList.push(bundle.write({
      dest: './dist/dist.' + moduleType + '.js',
      format: moduleType,
      sourceMap: true
    }))
  })

  return Promise.all(writePromiseList)

}).then(() => {
  console.log('全部模块格式打包完毕')
  // 其他代码
})
```

将package.json文件内的npm scripts命令修改为

```json
"build": "node rollup.js"
```

执行打包命令，查看打包结果

![rollup 自定义打包结果1](https://segmentfault.com/img/bVSKWD?w=557&h=123)

![rollup 自定义打包结果2](https://segmentfault.com/img/bVSKWN?w=268&h=262)

在这里我们可以看到，一个bundle可以被重复使用多次，因此我们可以用Promise.all方法来等待所有模块打包完成后再输出打包完毕的提示。

## demo13 除了打包JS，我们还能……

一个web项目内肯定不会只有js文件，还有css、html（也可能是模板文件）和其他类型的文件，那么我们在打包的时候能不能把这些文件一起打包呢？

我们需要区分一下，在这里的打包有两种意思，一种是让这些文件可以像JS文件一样，在源代码中被import并使用；还有一种是通过在源文件中import这些文件，最后将它们合并到一起并导出到一个最终文件内。

不同的rollup插件有不同的效果，在使用的时候一定要查看插件的相关说明

安装插件

```sql
npm i rollup-plugin-scss --save-dev
// or
yarn add rollup-plugin-scss --dev
```

编写配置文件

```js
import scss from 'rollup-plugin-scss'

export default {
  entry: './src/js/index.js',
  format: 'iife',
  dest: './dist/js/dist.js',
  sourceMap: true,
  plugins: [
    scss({
      output: './dist/css/style.css'
    })
  ]
}
```

在这里我们尝试编译和打包scss文件，将其合并成一个style.css文件，并输出到dist/css目录下

编写scss文件

```css
$blue: #69c4eb;

.bg-blue {
  background-color: $blue
}
$white: #fff;

.text-white {
  color: $white;
}
```

然后在源文件中引用这两个scss文件

```js
import '../scss/text.scss'
import '../scss/bg.scss'

var html = `
<div class="bg-blue">
<p class="text-white">测试文字</p>
</div>
`

document.body.innerHTML = html
```

执行打包命令，查看效果

![rollup 打包scss效果](https://segmentfault.com/img/bVSKWY?w=259&h=125)

## extra 编写你自己的rollup插件

有时候我们可能需要自己编写rollup插件来实现需求，rollup官方在wiki上提供了关于[编写插件的一些介绍](https://link.segmentfault.com/?enc=TIpDOKteuyVfjiywl8r61g%3D%3D.ecIrdpJ6txGEQImXiVRhSELRyqr234nPtyELaNokmNha9NWp8Bu5P7H6vh2otj2LsmEnbzDI1410YUj3deVV%2Fg%3D%3D)，下面我们就根据这些介绍来写一个自己的rollup插件。

我们在这里仿照scss插件编写一个stylus的rollup插件，让使用者可以import stylus文件，并编译打包导出到指定的目录下（为了节省代码量，只写了输出到指定路径的功能代码，其他的功能可以参考[scss插件](https://link.segmentfault.com/?enc=ABY2zQB2R%2F5ISnpF6LLMBg%3D%3D.RY%2BVIHWtp4g7OLkOTo9nOuEh%2Bo%2BETjAFt%2BBY2NcUktR7IXm4rFFcZHK78A%2BSfQJu)的具体代码）。

首先创建项目，在package.json文件中，除了一般信息之外，还要加上

```json
"main": "index.cjs.js",
"module": "index.es.js",
"jsnext:main": "index.es.js"
```

这些信息用来区分使用不同模块规范时使用的文件

安装我们需要用到的模块

```sql
npm i rollup rollup-plugin-babel babel-preset-es2015-rollup babel-core --save-dev
npm i rollup-pluginutils stylus --save
// or
yarn add rollup rollup-plugin-babel babel-preset-es2015-rollup babel-core --dev
yarn add rollup-pluginutils stylus
```

rollup-pluginutils和stylus是我们运行时需要的两个模块，stylus用来解析stylus文件，[pluginutils](https://link.segmentfault.com/?enc=GCW6EwtADuLK27E92QGCrg%3D%3D.n9hr9uvU%2F05wJ64nfC26AKfKFnjYm%2Beh0bpgVG9pqP54cFP8DrmN4BouLQSaIYVc)则提供给了我们一些编写插件常用的函数

编写rollup配置文件

```js
import babel from 'rollup-plugin-babel'

export default {
    entry: './index.es.js',
    dest: './index.cjs.js',
    format: 'cjs',
    plugins: [
        babel()
    ]
}
```

rollup插件需要一个含有指定属性的对象作为插件内容，rollup官方建议我们在编写插件的时候，export一个返回值为插件对象的函数，这样可以方便使用者指定插件的参数。

rollup会将解析的部分结果作为参数调用插件返回的对象中的一些函数属性，这些函数会在合适的时候被rollup调用（相当于rollup在执行各个操作时的钩子函数），下面我们介绍一些常用的属性：

- name：插件的名称，提供给rollup进行相关信息的输出
- load：不指定这个属性时，解析模块会默认去读取对应路径文件的内容；而当该值为函数（id => code）时，可以将函数最后的返回值作为文件的内容提供给rollup（可以用来生成自定义格式的代码）
- resolveId：一个（ (importee, importer) => id）形式的函数，用来解析ES6的import语句，最后需要返回一个模块的id
- transform：最常使用的属性，是一个函数，当rollup解析一个import时，会获取到对应路径文件的内容，并将内容和模块的名称作为参数提供给我们；这个函数执行完毕之后，需要返回一个作为代码的字符串或是类似`{ code, map }`结构的对象，用来表示解析完之后该模块的实际内容，map指的是sourceMap，而如果我们没有要导出的sourceMap，就可以将返回的map值设为`{mappings: ''}`
- ongenerate：当我们或rollup调用generate方法时，会被调用的一个钩子函数，接受generate的option作为参数
- onwrite：和ongenerate一样，调用write方法时，会被调用的一个钩子函数，接受write的option作为参数

一般情况下，我们通过transform函数来获取文件的id和内容，并对内容做一些处理，若需要输出文件则使用ongenerate或onwrite在rollup打包的最后阶段来做相应的输出。

load和resolveId在一般情况下不会使用，除非你有特殊的需求（例如对路径、模块id进行修改等)

根据上面这些内容，我们编写具体的插件内容

```javascript
import { createFilter } from 'rollup-pluginutils'
import fs from 'fs'
import path from 'path'
import stylus from 'stylus'

// 递归创建文件夹
function mkdirs(dir) {
  return new Promise((resolve, reject) => {
    fs.exists(dir, (exist) => {
      if (exist) {
        resolve()
      } else {
        mkdirs(path.dirname(dir)).then(() => {
          fs.mkdir(dir, (err) => {
            if (err) {
              reject()
            } else {
              resolve()
            }
          })
        })
      }
    })
  })
}

// 导出一个function
export default function stylusPlugin(options = {}) {
  // 创建一个文件过滤器，过滤以css，styl结尾的文件
  const stylusFilter = createFilter(options.include || ['**/*.css', '**/*.styl'], options.exclude)

  // dest用来保存指定的输出路径
  let dest = options.output,
      // styleNodes用来暂存不同文件的css代码
      styleNodes = {}

  // 编译stylus文件
  function complier(str, stylusOpt) {
    return new Promise((resolve, reject) => {
      stylus.render(str, stylusOpt, (err, css) => {
        if (err) {
          reject(err)
        } else {
          resolve(css)
        }
      })
    })
  }

  return {
    // 插件名称
    name: 'rollup-plugin-stylus',

    // 解析import时调用，获取文件名称和具体代码，将它们保存起来
    transform (code, id) {
      if (!stylusFilter(id)) {
        return
      }

      styleNodes[id] = code
      return ''
    },
    // generate时调用，用stylus解析代码，并输出到指定目录中
    async ongenerate (genOpt) {
      let css = ''
      for (let id in styleNodes) {
        // 合并所有css代码
        css += styleNodes[id] || ''
      }

      // 编译stylus代码
      if (css.length) {
        try {
          css = await complier(css, Object.assign({}, options.stylusOpt))
        } catch (error) {
          console.log(error)
        }
      }

      // 没有指定输出文件路径时，设置一个默认文件
      if (typeof dest !== 'string') {
        if (!css.length) {
          return
        }

        dest = genOpt.dest || 'bundle.js'
        if (dest.endsWith('.js')) {
          dest = dest.slice(0, -3)
        }
        dest = dest + '.css'
      }

      // 创建目录，并将css写入到结果文件内
      await mkdirs(path.dirname(dest))
      return new Promise((resolve, reject) => {
        fs.writeFile(dest, css, (err) => {
          if (err) {
            reject(err)
          } else {
            resolve()
          }
        })
      })
    }
  }
}
```

这样，一个解析并打包stylus文件的rollup插件就写好了，你可以在你的工程中引用这个文件，也可以将其作为一个模块发布，以便于分享给其他人使用。

## 总结 and 一个完整的rollup项目的模板

rollup在打包JS上是一个十分快捷方便的工具，但和webpack相比，他的生态圈还是不够强大，对于大型web工程的适应度相对不足

rollup的优点在于方便的配置，天然的ES6模块支持让我们可以直接使用import和export语法，在打包JS上，不实现自己的模块机制，而是使用目前常见的模块规范有助于其他工具（例如requirejs）来引用打包文件；tree-shaking的特性也有助于减少代码量，因此我认为rollup比起构建应用工程项目，更适合用来构建一个JS库或node模块

我将上面介绍的插件集合到一起，添加了测试的支持，制作了一个较为完整的rollup工程模板。放在`rollup-project-template`目录下，需要的同学可以自取（你也可以增加或删除任意你需要的模块，来组建属于你自己的rollup项目模板）

## 参考资料

- [rollup官方wiki](https://link.segmentfault.com/?enc=cAiaNmyJdFXZidH%2Fzp2XDA%3D%3D.MgNlh9yKsVyk7aHs0NPQ%2F1e7hKBqhBO1Vft70gIb%2B2IzmauAb5f%2F0B8SmtnkrgN%2F)
- [rollup插件合集](https://link.segmentfault.com/?enc=n%2Bw7uKb9X0C90V4bYMtVcg%3D%3D.ZhY69cQ%2FH9p31tpOZgtudVB1WAgC6j%2F5arV0Rmk9T31JiTHUuOw9c9a0t5CBGcYC)
- [如何通过 Rollup.js 打包 JavaScript —— 知乎专栏](https://link.segmentfault.com/?enc=pM6LmXFLTblbDodQ2OABIQ%3D%3D.o0QcXUrAocze7kxYf0Y1sdewW4ITe2GmPL6i33UzVCK78kEgH1lbDq8mRZHbSKnt)