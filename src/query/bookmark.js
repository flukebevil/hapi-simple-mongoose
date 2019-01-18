const Dao = require('../model/bookmark')
const userDao = require('../model/user')

const findUserIdInBookmark = (username) => {
    return userDao.findOne({ username: username }).then(result => result._id, reject => reject)
}

const findBookmarkId = (movieId, userId) => {
    return Dao.findOneAndDelete({ movie_id: movieId, user_id: userId }).then(result => result, reject => reject)
}

const findUserId = (username) => {
    return userDao.findOne({ user_name: username })
        .then(result => result, reject => reject)
}

const deleteBookmark = (id) => {
    Dao.findOneAndDelete({ _id: id })
        .then(result => result, reject => reject)
}

const saveBookmark = (userId, movieId) => {
    const creatorBookmark = new Dao({
        user_id: userId,
        movie_id: movieId
    })
    creatorBookmark.save()
        .then(result => result, reject => reject)
}

const showAllBookmark = (userId) => {
    return Dao.find({ user_id: userId }).then(result => result, reject => reject)
}

module.exports = {
    findUserIdInBookmark,
    deleteBookmark,
    saveBookmark,
    showAllBookmark,
    findUserId,
    findBookmarkId
}