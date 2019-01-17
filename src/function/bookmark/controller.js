const dao = require('../../query/bookmark')
const boom = require('boom')

const bookmark = (request, h) => {
    const usernameByAuth = request.auth.credentials.username
    if (usernameByAuth) {
        dao.findBookmarkById(h.request.payload.movie_id, usernameByAuth).then(
            res => console.log(res)
        )

        // try {
        //     dao.findBookmarkById(h.request.payload.movie_id, usernameByAuth, (err, bookmarkId) => {
        //         if (err) console.log(err)
        //         if (bookmarkId) {
        //             dao.deleteBookmark(bookmarkId._id, (err, deleted) => {
        //                 if (err) console.log(err)
        //                 return deleted
        //             })
        //         } else {
        //             dao.saveBookmark(dao.findUserId(usernameByAuth, (err, saveResult) => {
        //                 if (err) console.log(err)
        //                 return saveResult
        //             }))
        //         }
        //     })
        // } catch (err) {
        //     console.log(err)
        //     return boom.unauthorized('May be wrong token can you fucking contact to me ???? LUL')
        // }
    }
}

module.exports = {
    bookmark
}