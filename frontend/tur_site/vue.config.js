module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000', // ваш Express сервер
          changeOrigin: true,
          pathRewrite: {
            '^/api': '/api'
          }
        }
      }
    }
  }