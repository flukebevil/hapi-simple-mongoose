const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookmarkSchema = new Schema ({
    user_id: {type: String},
    movie_id: {type: String},
    poster: {type: String},
    overview: {type: String},
    title: {type: String}
})

module.exports = mongoose.model('Bookmark', bookmarkSchema)