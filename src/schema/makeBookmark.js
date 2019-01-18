'use strict'

const Joi = require('joi')

const makeBookmark = Joi.object({
    movie_id: Joi.string().required(),
    title: Joi.string(),
    overview: Joi.string(),
    poster: Joi.string()
})

module.exports = makeBookmark