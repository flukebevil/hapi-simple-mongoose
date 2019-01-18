const dao = require('../../query/bookmark')
const boom = require('boom')

const bookmark = async (request, h) => {
    const userIdByAuth = request.auth.credentials.user_id
    if (userIdByAuth) {
        try {
            const bookmarkId = dao.findBookmarkId(request.payload.movie_id, userIdByAuth)
            if (bookmarkId) {
                await dao.deleteBookmark(bookmarkId)
                return { message: "This fucking movie has been removed from your bookmark list" }
            } else {
                await dao.saveBookmark(userIdByAuth, request.payload.movie_id)
                return { message: "saved" }
            }
        } catch (err) {
            return boom.unauthorized('May be wrong token can you fucking contact to me ???? LUL')
        }
    }
}

const getBookmarkAll = (request, h) => {
    const userIdByAuth = request.auth.credentials.user_id
    return dao.showAllBookmark(userIdByAuth).catch(_ => { boom.notFound('some thing was wrong') })
}

module.exports = {
    bookmark,
    getBookmarkAll
}