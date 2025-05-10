# Vite 配置说明

2025-05

Vite 是一个轻量级的前端构建工具，专为现代 Web 开发设计。

它利用原生 ES 模块和编译时优化，提供了极快的冷启动和即时热更新能力。

配置文件 `vite.config.js` 详细介绍如下

## 初始化项目

~~~bash
npm init vite@latest my-react-app -- --template react
cd my-react-app
npm install
~~~

## 基础配置示例

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: process.cwd(), // 项目根目录
  base: '/',           // 开发或生产环境服务的公共基础路径
  publicDir: 'public', // 静态资源目录
  
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,          // 自动打开浏览器
    proxy: {             // 配置跨域代理
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  // 构建配置
  build: {
    outDir: 'dist',      // 输出目录
    assetsDir: 'assets', // 静态资源存放目录
    sourcemap: false,    // 是否生成 sourcemap
    minify: 'terser',    // 压缩工具
    terserOptions: {     // 压缩选项
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  
  // 解析配置
  resolve: {
    alias: {             // 路径别名配置
      '@': '/src',
      'components': '/src/components'
    }
  },
  
  // CSS 配置
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
})
```

### 常用配置项说明

#### 1. 插件配置
Vite 通过插件扩展功能，常用插件包括：
- `@vitejs/plugin-react`：React 支持
- `@vitejs/plugin-vue`：Vue 支持
- `vite-plugin-svg-icons`：SVG 图标支持
- `vite-plugin-pwa`：渐进式 Web 应用支持

#### 2. 开发服务器配置
- `port`：指定开发服务器端口
- `proxy`：配置 API 代理，解决跨域问题
- `https`：启用 HTTPS
- `hmr`：配置热更新行为

#### 3. 构建配置
- `outDir`：指定输出目录
- `assetsDir`：指定静态资源存放目录
- `minify`：指定压缩工具（terser 或 esbuild）
- `rollupOptions`：自定义 Rollup 打包配置

#### 4. 路径别名配置
使用 `resolve.alias` 配置路径别名，方便代码中引用：
```javascript
resolve: {
  alias: {
    '@': '/src',
    'components': '/src/components'
  }
}
```

#### 5. CSS 配置
- `preprocessorOptions`：配置预处理器（如 SCSS、Less）
- `postcss`：配置 PostCSS 插件
- `cssModuleOptions`：配置 CSS Modules

#### 6. 环境变量配置
Vite 支持多种环境变量配置：
- `.env`：所有环境都会加载
- `.env.development`：开发环境
- `.env.production`：生产环境



## React 项目的优化配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          // 配置装饰器支持
          ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
      }
    }),
    svgr({
      svgrOptions: {
        icon: true
      }
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'utils': path.resolve(__dirname, 'src/utils')
    }
  },
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  
  build: {
    chunkSizeWarningLimit: 1000, // 增大块大小警告限制
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 配置分包策略
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";@import "@/styles/mixins.scss";`
      }
    }
  }
})
```



## 常见问题解决方案

### 1. SVG 作为组件导入

 安装 `vite-plugin-svgr` 插件：

 ```bash
 npm install vite-plugin-svgr --save-dev
 ```
 然后在 `vite.config.js` 中配置：
 ```javascript
 import svgr from 'vite-plugin-svgr'

 export default defineConfig({
   plugins: [
     // 其他插件...
     svgr()
   ]
 })
 ```

### 2. TypeScript 配置

 Vite 内置支持 TypeScript，但如果需要自定义配置，可以创建 `tsconfig.json` 文件：
 ```json
 {
   "compilerOptions": {
     "target": "ESNext",
     "module": "ESNext",
     "lib": ["DOM", "ESNext"],
     "jsx": "react-jsx",
     "moduleResolution": "Node",
     "strict": true,
     "esModuleInterop": true,
     "skipLibCheck": true,
     "forceConsistentCasingInFileNames": true,
     "baseUrl": ".",
     "paths": {
       "@/*": ["src/*"],
       "components/*": ["src/components/*"]
     }
   }
 }
 ```

### 3. 环境变量使用

 在代码中可以通过 `import.meta.env` 访问环境变量：
 ```javascript
 console.log(import.meta.env.MODE) // 输出当前模式（development/production）
 console.log(import.meta.env.VITE_API_URL) // 访问自定义环境变量
 ```

以上是 `vite.config.js` 的基本配置指南，你可以根据项目需求进行调整和扩展。

Vite 的配置非常灵活，更多详细配置可以参考 [Vite 官方文档](https://vitejs.dev/config/)。
