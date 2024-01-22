const { serverConfig } = require('../config')
const { AUTH_COOKIE_NAME, AUTH_REFRESH_COOKIE_NAME } = require('../constants/cookies')
const { GET } = require('../constants/http-verbs')

module.exports = {
  method: GET,
  path: '/auth/sign-in',
  handler: async (request, h) => {
    const redirect = request.yar.get('redirect') ?? '/'

    if (request.query.token) {
      console.log('Setting auth cookie')
      h.state(AUTH_COOKIE_NAME, request.query.token, serverConfig.cookieOptions)
    }

    if (request.query.refreshToken) {
      console.log('Setting refresh cookie')
      h.state(AUTH_REFRESH_COOKIE_NAME, request.query.refreshToken, serverConfig.cookieOptions)
    }

    return h.redirect(redirect)
  }
}
