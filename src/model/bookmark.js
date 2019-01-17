const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookmarkSchema = new Schema ({
    user_id: {type: String},
    movie_id: {type: String}
})

module.exports = mongoose.model('Bookmark', bookmarkSchema)