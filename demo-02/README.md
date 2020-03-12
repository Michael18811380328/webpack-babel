# demo02

这里尝试使用 npm run eject 自定义工程脚本

提示：Create React App 2+支持TypeScript，Sass，CSS模块等，而无需弹出：

~~~bash
npm run eject

> demo-02@0.1.0 eject /Users/seafile/Desktop/webpack-babel/demo-02
> react-scripts eject

NOTE: Create React App 2+ supports TypeScript, Sass, CSS Modules and more without ejecting: https://reactjs.org/blog/2018/10/01/create-react-app-v2.html

? Are you sure you want to eject? This action is permanent. Yes
Ejecting...

Copying files into /Users/seafile/Desktop/webpack-babel/demo-02
  Adding /config/env.js to the project
  Adding /config/getHttpsConfig.js to the project
  Adding /config/modules.js to the project
  Adding /config/paths.js to the project
  Adding /config/pnpTs.js to the project
  Adding /config/webpack.config.js to the project
  Adding /config/webpackDevServer.config.js to the project
  Adding /config/jest/cssTransform.js to the project
  Adding /config/jest/fileTransform.js to the project
  Adding /scripts/build.js to the project
  Adding /scripts/start.js to the project
  Adding /scripts/test.js to the project

Updating the dependencies
  Removing react-scripts from dependencies
  Adding @babel/core to dependencies
  Adding @svgr/webpack to dependencies
  Adding @typescript-eslint/eslint-plugin to dependencies
  Adding @typescript-eslint/parser to dependencies
  Adding babel-eslint to dependencies
  Adding babel-jest to dependencies
  Adding babel-loader to dependencies
  Adding babel-plugin-named-asset-import to dependencies
  Adding babel-preset-react-app to dependencies
  Adding camelcase to dependencies
  Adding case-sensitive-paths-webpack-plugin to dependencies
  Adding css-loader to dependencies
  Adding dotenv to dependencies
  Adding dotenv-expand to dependencies
  Adding eslint to dependencies
  Adding eslint-config-react-app to dependencies
  Adding eslint-loader to dependencies
  Adding eslint-plugin-flowtype to dependencies
  Adding eslint-plugin-import to dependencies
  Adding eslint-plugin-jsx-a11y to dependencies
  Adding eslint-plugin-react to dependencies
  Adding eslint-plugin-react-hooks to dependencies
  Adding file-loader to dependencies
  Adding fs-extra to dependencies
  Adding html-webpack-plugin to dependencies
  Adding identity-obj-proxy to dependencies
  Adding jest to dependencies
  Adding jest-environment-jsdom-fourteen to dependencies
  Adding jest-resolve to dependencies
  Adding jest-watch-typeahead to dependencies
  Adding mini-css-extract-plugin to dependencies
  Adding optimize-css-assets-webpack-plugin to dependencies
  Adding pnp-webpack-plugin to dependencies
  Adding postcss-flexbugs-fixes to dependencies
  Adding postcss-loader to dependencies
  Adding postcss-normalize to dependencies
  Adding postcss-preset-env to dependencies
  Adding postcss-safe-parser to dependencies
  Adding react-app-polyfill to dependencies
  Adding react-dev-utils to dependencies
  Adding resolve to dependencies
  Adding resolve-url-loader to dependencies
  Adding sass-loader to dependencies
  Adding semver to dependencies
  Adding style-loader to dependencies
  Adding terser-webpack-plugin to dependencies
  Adding ts-pnp to dependencies
  Adding url-loader to dependencies
  Adding webpack to dependencies
  Adding webpack-dev-server to dependencies
  Adding webpack-manifest-plugin to dependencies
  Adding workbox-webpack-plugin to dependencies

Updating the scripts
  Replacing "react-scripts start" with "node scripts/start.js"
  Replacing "react-scripts build" with "node scripts/build.js"
  Replacing "react-scripts test" with "node scripts/test.js"

Configuring package.json
  Adding Jest configuration
  Adding Babel preset

Running yarn...
yarn install v1.21.1
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
warning " > @testing-library/user-event@7.2.1" has unmet peer dependency "@testing-library/dom@>=5".
warning "@typescript-eslint/eslint-plugin > tsutils@3.17.1" has unmet peer dependency "typescript@>=2.8.0 || >= 3.2.0-dev || >= 3.3.0-dev || >= 3.4.0-dev || >= 3.5.0-dev || >= 3.6.0-dev || >= 3.6.0-beta || >= 3.7.0-dev || >= 3.7.0-beta".
warning " > eslint-config-react-app@5.2.0" has incorrect peer dependency "eslint-plugin-flowtype@3.x".
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 4.39s.
Ejected successfully!

Staged ejected files for commit.
~~~
