'use strict'

const { getAllUser, login, register, edit } = require('./controller')
const Users = require('../../dao/user')
module.exports = server => {

    server.route({
        method: 'POST',
        path: '/users',
        config: {
            handler: register,
            auth: false
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
            auth: false
        },
        handler: login
    })

    server.route({
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt'
            },
            handler: getAllUser
        },
        path: '/users',
    })
}