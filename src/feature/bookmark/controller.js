const dao = require('../../query/movie/bookmark')
const boom = require('boom')
const baseResponse = require('../../base/response')

const bookmark = async (request, h) => {
    const userIdByAuth = request.auth.credentials.user_id
    if (userIdByAuth) {
        try {
            const bookmarkId = await dao.findBookmarkId(request.payload.movie_id, userIdByAuth)
            if (bookmarkId) {
                await dao.deleteBookmark(bookmarkId)
                return baseResponse(true, "This fucking movie has been removed from your bookmark list")
            } else {
                await dao.saveBookmark(userIdByAuth, request.payload)
                return baseResponse(true, "saved")
            }
        } catch (err) {
            return boom.unauthorized('May be wrong token can you fucking contact to me ???? LUL')
        }
    }
}

const getBookmarkAll = async (request, h) => {
    const userIdByAuth = request.auth.credentials.user_id
    const bookmarkList = await dao.showAllBookmark(userIdByAuth).catch(_ => { boom.notFound('some thing was wrong') })
    return baseResponse(true, "success", bookmarkList)
}

module.exports = {
    bookmark,
    getBookmarkAll
}