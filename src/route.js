const usersRoute = require('./function/auth/route')

module.exports = server => {
    usersRoute(server)
}