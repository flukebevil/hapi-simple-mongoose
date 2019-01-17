const Dao = require('../model/bookmark')
const userDao = require('../model/user')

const findBookmarkById = (movieId, username) => {
    return new Promise((resolve, reject) => {
        userDao.findOne({ user_name: username }, (err, res) => {
            if (err) reject(err)
            if (res) {
                Dao.findOne({ movie_id: movieId, user_id: res._id }, (err, res) => {
                    if (err)
                        reject(err)
                    if (res)
                        resolve(res)
                    else
                        resolve(null)
                })
            } else
                resolve(null)
        })
    })
}

const findUserId = (username) => {
    return new Promise((resolve, reject) => {
        userDao.findOne({ user_name: username }, (err, res) => {
            if (err) reject(err)
            res ? resolve(res) : resolve(null)
        })
    })
}

const deleteBookmark = (id) => {
    return new Promise((resolve, reject) => {
        Dao.findOneAndDelete({ _id: id }, (err, res) => {
            if (err)
                reject(err)
            resolve({ message: "This movie has been remove from your fucking bookmark list" })
        })
    })
}

const saveBookmark = (userId, movieId) => {
    return new Promise((resolve, reject) => {
        const creatorBookmark = new Dao({
            user_id: userId,
            movie_id: movieId
        })
        creatorBookmark.save((err, res) => {
            if (err) reject(err)
            resolve({ message: "Saved this movie to your bookmark list" })
        })
    })
}

const showAllBookmark = (userId) => {
    return new Promise((resolve, reject) => {
        Dao.find({ user_id: userId }, (err, res) => {
            if (err) reject(err)
            if (res)
                resolve(res)
            else
                resolve(null)
        })
    })
}

module.exports = {
    findBookmarkById,
    deleteBookmark,
    saveBookmark,
    showAllBookmark,
    findUserId
}