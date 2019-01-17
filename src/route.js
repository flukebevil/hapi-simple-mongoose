const usersRoute = require('./function/auth/route')
const bookmarkRoute = require('./function/bookmark/route')

module.exports = server => {
    usersRoute(server)
    bookmarkRoute(server)
}