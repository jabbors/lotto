const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: 'docs',
  publicPath: '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = "Lotto";
        return args;
      })
  }
})
