module.exports = {
  // 基本路径
  publicPath: '/',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      stylus: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 9099,
    proxy: {
      '/api': {
        target: 'http://localhost:9080',
        changeOrigin: true, // 是否允许跨越
        pathRewrite: {
          '^/api': '' // 重写,
        }
      }
    }
  }
}
