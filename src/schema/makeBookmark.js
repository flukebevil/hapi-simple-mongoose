'use strict'

const Joi = require('joi')

const makeBookmark = Joi.object({
    movie_id: Joi.string().required()
})

module.exports = makeBookmark