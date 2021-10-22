# 01 笔记

## 单文件编译

```bash
rollup 入口文件 --file 输出文件 --format 输出格式
```

常用输出格式分为三种：iife cjs umd，表示浏览器环境，node 环境，两者都支持的环境

全部格式："amd", "cjs", "system", "es", "iife" or "umd".

第一个测试文件中，包括了这三个打包的方式，可以查看具体的打包结果
