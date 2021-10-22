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
