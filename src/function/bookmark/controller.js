const dao = require('../../query/bookmark')
const boom = require('boom')

const bookmark = (request, h) => {
    const usernameByAuth = request.auth.credentials.username
    if (usernameByAuth) {
        try{
          const bookmarkId =  dao.findBookmarkById(usernameByAuth)
          if (bookmarkId) {
              return dao.deleteBookmark(bookmarkId)
          } else {
              return dao.saveBookmark(
                  dao.findUserId(usernameByAuth),
                  h.request.payload.movie_id
              )
          }
        } catch (err) {
            return boom.unauthorized('May be wrong token can you fucking contact to me ???? LUL')
        }
    }
}

module.exports = {
    bookmark
}