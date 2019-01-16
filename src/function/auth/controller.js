const Data = require('../../query/users')
const Dao = require('../../model/user')
const boom = require('boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getAllUser = (request, response) => {
    return Data.findAll()
}

const register = (request, h) => {
    const params = h.request.payload
    const db = new Dao(params)
    return new Promise((resolve, reject) => {
        if (Data.findUniqueUser(params.username) === false) {
            resolve({ message: "Username has been taken Fuck" })
        } else {
            db.save((err, data) => {
                console.log(err)
                err ? reject(boom.boomify(new Error(err.ValidationError), { statusCode: 400 }))
                    : resolve(data)
            })
        }
    })
}

const login = (request, h) => {
    const params = h.request.payload
    return new Promise((resolve, reject) =>
        Dao.findOne({ username: params.username }, (err, user) => {
            if (err) reject(err)
            if (user) {
                bcrypt.compare(params.password, user.password, (err, isMatch) => {
                    if (err) reject(err)
                    if (isMatch) {
                        const token = jwt.sign(
                            { name: user.name },
                            process.env.SECREAT_KEY,
                            { algorithm: 'HS256', expiresIn: "1h" }
                        )
                        resolve({
                            token: token,
                            name: user.name
                        })
                    }
                    else
                        reject(boom.unauthorized('Wrong information :b '))
                })
            } else {
                resolve(boom.unauthorized('Information fucking was wrong'))
            }
        })
    )
}

const edit = async (request, h) => {
    console.log(h.request.payload)
    return Data.update(request.params.user_id, h.request.payload.name)
}

module.exports = {
    getAllUser,
    login,
    register,
    edit
}