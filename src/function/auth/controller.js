const Data = require('../../query/users')
const Dao = require('../../model/user')
const boom = require('boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const getAllUser = (request, response) => {
    return Data.findAll()
}

const register = async (request, h) => {
    const params = h.request.payload
    const db = new Dao(params)
    const checkUser = await Data.findUniqueUser(request.payload.username).catch(_ => {
        return boom.forbidden('Username has been taken fucking goddd sakmal')
    })
    console.log(checkUser)
    if (checkUser) {
        return boom.badRequest('Username has been taken Fuck')
    } else {
        db.save().catch({ message: "can not save" })
        return ({ success: true })
    }
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
                            { user_id: user._id },
                            process.env.SECREAT_KEY,
                            { algorithm: 'HS256', expiresIn: "1d" }
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