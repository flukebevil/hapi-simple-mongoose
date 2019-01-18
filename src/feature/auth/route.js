'use strict'

const { getAllUser, login, register, edit } = require('./controller')
const Users = require('../../model/user')
const createUserSchema = require('../../schema/creatUser')
const userLoginSchema = require('../../schema/userLogin')
module.exports = server => {

    server.route({
        method: 'POST',
        path: '/users/register',
        config: {
            handler: register,
            auth: false,
            validate: {
                payload: createUserSchema
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/users',
        config: {
            auth: false
        },
        handler: (request, reply) => {
            return Users.deleteMany()
        }
    })

    server.route({
        method: 'POST',
        path: '/users/edit/{user_id}',
        config: {
            auth: 'jwt'
        },
        handler: edit
    })

    server.route({
        path: '/users/login',
        method: 'POST',
        config: {
            auth: false,
            handler: login,
            validate: {
                payload: userLoginSchema
            }
        },
    })

    server.route({
        method: 'GET',
        config: {
            auth: 'jwt'
        },
        handler: getAllUser,
        path: '/users',
    })
}