const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        pathRewrite: { '^/api': '' }
      }
      // '/ws': {
      //   target: 'ws://127.0.0.1:7002',
      //   ws: true
      // }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': resolve('src')
      },
      fallback: {
        fs: false,
        crypto: require.resolve('crypto-browserify')
      }
    },
    plugins: [new NodePolyfillPlugin()]
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     // to ignore runtime.js
    //     // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      // loadsh
      config.plugin('loadshReplace').use(new LodashModuleReplacementPlugin())
      // gzipped
      config.plugin('CompressionPlugin').use(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // ???????????????
          threshold: 10240, // ?????????10k???????????????
          deleteOriginalAssets: false, // ??????????????????
          minRatio: 0.8 // ?????????
        })
      )
      // split
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true // ??????????????????????????? chunk???????????? true ???????????????????????? chunk ??????????????????????????????????????????????????????????????????????????????
          }
        }
      })
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk('single')
    })
  }
})
