// https://github.com/vuejs/vue-docs-zh-cn/blob/master/vue-cli/config.md
const path = require('path')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  baseUrl: '/vue-eden/', // gh-pages
  outputDir: 'dist',
  lintOnSave: true,

  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // Ulza
    } else {
      // Ganteng
    }
  },
  chainWebpack: config => {
    // https://github.com/mozilla-neutrino/webpack-chain#getting-started
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))

    config.resolve.extensions
      .add('.js')
      .add('.vue')
      .add('.styl')

    //config.when(process.env.NODE_ENV === 'production', config =>
    //  config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin)
    //)
  },

  productionSourceMap: true,
  // CSS 
  css: {
    // CSS source map？
    sourceMap: false
  },

  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null // string | Object
  }
}
