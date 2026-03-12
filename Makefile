.PHONY: build
build:
	sed -i "s#publicPath: '/'#publicPath: ''#g" vue.config.js
	yarn build
