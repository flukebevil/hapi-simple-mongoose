const Dao = require('../model/bookmark')
const userDao = require('../model/user')

const findBookmarkById = (movieId, username) => {
    userDao.findOne({ user_name: username }, (err, res) => {
        if (err) console.log(err)
        // TODO catch here if res has null value naja 
        return Dao.findOne({ movie_id: movieId, user_id: res._id })
            .then(result => result, reject => reject)
    })
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
    Dao.find({ user_id: userId }).then(result => result, reject => reject)
}

module.exports = {
    findBookmarkById,
    deleteBookmark,
    saveBookmark,
    showAllBookmark,
    findUserId
}