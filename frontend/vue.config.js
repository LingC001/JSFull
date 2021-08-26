module.exports = {
  lintOnSave: 'warning',
  devServer: {
    port: 8082,
    // 反向代理配置
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
