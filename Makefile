.PHONY: build
build:
	sed -i "s#publicPath: '/'#publicPath: '/lotto/'#g" vue.config.js
	yarn build
