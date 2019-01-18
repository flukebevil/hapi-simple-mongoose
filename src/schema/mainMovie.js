const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MainMovie = new Schema ({
    user_id: {type: String},
    list_id: {type: String},
    favorite_id: {type: String},
    rating: {type: String}
})

module.exports = mongoose.model('MainMovie', MainMovie)