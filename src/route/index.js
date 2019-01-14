'use strict'

const Users = require('../model/user')
const Boom = require('boom')
const Bcrypt = require('bcrypt')

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
                return new Promise((resolve, reject) => {
                    if (params.repassword != null &&
                        db.password === params.repassword
                    ) {
                        db.save((err, data) => {
                            console.log(err)
                            err ? reject(Boom.boomify(new Error(err.ValidationError), { statusCode: 400 }))
                                : resolve(data)
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
        method: 'POST',
        path: '/users/edit/{user_id}',
        handler: async (request, h) => {
            return new Promise((resolve, reject) => {
                Users.findOneAndUpdate(request.params.user_id
                    , {
                        $set: { name: h.request.payload.name }
                    }, (err, res) => {
                        if (err) reject(err)
                        resolve(res)
                    })
            })
        }
    })

    server.route({
        path: '/users/login',
        method: 'POST',
        handler: async (request, h) => {
            const params = h.request.payload
            return new Promise((resolve, reject) =>
                Users.findOne({ username: params.username }, (err, user) => {
                    if (err) reject(err)
                    Bcrypt.compare(params.password, user.password, (err, isMatch) => {
                        if (err) reject(err)
                        if (isMatch)
                            resolve({
                                id: user.id,
                                name: user.name
                            })
                        else
                            reject(Boom.unauthorized('Wrong information :b '))
                    })
                })
            )
        }
    })

    server.route({
        method: 'GET',
        path: '/users',
        handler: () => {
            return Users.find()
        }
    })
}