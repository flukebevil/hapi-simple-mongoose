const usersRoute = require('./feature/auth/route')
const bookmarkRoute = require('./feature/bookmark/route')

module.exports = server => {
    usersRoute(server)
    bookmarkRoute(server)
}