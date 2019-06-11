依赖版本


~~~json
"babel-cli": "^6.26.0",
"babel-plugin-transform-runtime": "^6.23.0",
"babel-preset-env": "^1.7.0",
"babel-preset-es2015": "^6.24.1",
"babel-preset-react": "^6.24.1",
"babel-preset-stage-2": "^6.24.1",
~~~

Makefile 脚本

~~~makefile
PROJECT=seafile-dtable

dist: clean transpile postdist

clean:
	@echo '--> Cleaning dist'
	rm -rf dist/* 2> /dev/null
	@echo "\033[32;36m clean dist success \033[0m"

transpile:
	@echo "--> Compile dist"
	export NODE_ENV=production && node_modules/babel-cli/bin/babel.js src --out-dir dist
	@echo "\033[32;36m compile dist success \033[0m"

postdist:
	@echo "--> Copy css and remove settings.js"
	cp -r src/css dist && cp -r src/lib/css dist/lib && rm dist/settings.js
	@echo "\033[32;36m post dist success \033[0m"

.PHONY: transpile postdist clean
~~~

ignore

减少 dist 目录



babelrc 配置

~~~js
{ 
  "presets": [
    "es2015",
    "react",
    "env",
    "stage-2"
  ],
  'plugins': [
    [
      'transform-runtime', 
      {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime'
      }
    ]
  ]
~~~


