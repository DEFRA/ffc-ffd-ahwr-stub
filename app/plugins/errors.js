const { serverConfig } = require('../config')

module.exports = {
  plugin: {
    name: 'error-pages',
    register: (server, options) => {
      server.ext('onPreResponse', (request, h) => {
        const response = request.response

        if (response.isBoom) {
          const statusCode = response.output.statusCode

          if (statusCode === 401) {
            request.yar.set('redirect', request.url.path)
            console.log(request.url)
            return h.redirect(`${serverConfig.gatewayHost}/auth/sign-in?redirect=${request.url.host}/auth/sign-in`)
          }

          if (statusCode === 403) {
            return h.view('403').code(statusCode)
          }

          if (statusCode === 404) {
            return h.view('404').code(statusCode)
          }

          request.log('error', {
            statusCode,
            data: response.data,
            message: response.message
          })

          return h.view('500').code(statusCode)
        }
        return h.continue
      })
    }
  }
}
