const routes = [].concat(
  require('../routes/healthy'),
  require('../routes/healthz'),
  require('../routes/assets'),
  require('../routes/'),
  require('../routes/home'),
  require('../routes/sign-in')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    }
  }
}
