'use strict'

const Joi = require('joi')

const createUserSchema = Joi.object({
    username: Joi.string().min(6).max(30).required(),
    password: Joi.string().min(6).required(),
    repassword: Joi.string().min(6).required(),
    name: Joi.string().required()
})

module.exports = createUserSchema