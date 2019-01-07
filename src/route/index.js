'use strict'

const Users = require('../model/user')
const Boom = require('boom')

module.exports = server => {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'hello world';
        }
    })

    server.route({
        method: 'POST',
        path: '/users',
        config: {
            handler: async (request, h) => {
                const params = h.request.payload
                const db = new Users(params)
                return await new Promise((resolve, reject) => {
                    if (params.repassword != null &&
                        db.password == params.repassword
                    ) {
                        db.save((err, data) => {
                            err ? reject(Boom.boomify(new Error(err.ValidationError), { statusCode: 400 }))
                            :resolve(data)
                        })
                    }
                    else reject(Boom.boomify(new Error('Fuck uuuu Bitch juz see ur field!!'), { statusCode: 400 }))
                }
                )
            }
        }
    })

    server.route({
        method: 'DELETE',
        path: '/users',
        handler: (request, reply) => {
            return Users.deleteMany()
        }
    })

    server.route({
        path: '/users/login',
        method: 'POST',
        handler: async (request, h) => {
            try {
                const params = h.request.payload
                return await new Promise((resolve, reject) => {
                    Users.findOne({ username: params.username, password: params.password },
                        (err, res) => (res == null) ? reject(Boom.unauthorized('fuck u')) : resolve(res))
                })
            } catch (e) {
                throw Boom.unauthorized(e)
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/users',
        handler: () => {
            return Users.find()
        }
    })
}