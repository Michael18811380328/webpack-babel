import json from 'rollup-plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: './index.js',
    output: {
      file: 'bundle.js',
      format: 'cjs'
    },
    plugins: [
      json(),
      resolve(),
      commonjs(),
    ]
  }
];

// 如果是异步导入插件，需要改写一下输出的函数
// export default (async () => ({
//   input: 'main.js',
//   plugins: [isProduction && (await import('rollup-plugin-terser')).terser()],
//   output: {
//     file: 'bundle.js',
//     format: 'cjs'
//   }
// }))();
