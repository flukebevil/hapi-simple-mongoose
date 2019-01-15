const Data = require('../../data/users')
const Dao = require('../../dao/user')
const boom = require('boom')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')


const getAllUser = (request, _) => {
    console.log(Data.findAll())
    return Data.findAll()
}

const register = (request, h) => {
    const params = h.request.payload
    const db = new Dao(params)
    return new Promise((resolve, reject) => {
        if (params.repassword != null &&
            db.password === params.repassword
        ) {
            db.save((err, data) => {
                console.log(err)
                err ? reject(boom.boomify(new Error(err.ValidationError), { statusCode: 400 }))
                    : resolve(data)
            })
        }
        else reject(boom.boomify(new Error('Fuck uuuu Bitch juz see ur field!!'), { statusCode: 400 }))
    })
}


const login = (request, h) => {
    const params = h.request.payload
    return new Promise((resolve, reject) =>
        Dao.findOne({ username: params.username }, (err, user) => {
            if (err) reject(err)
            bcrypt.compare(params.password, user.password, (err, isMatch) => {
                if (err) reject(err)
                if (isMatch) {
                    const token = JWT.sign({
                        exp: Math.floor(Date.now() / 1000) + (60*60),
                        data: user.name
                    }, 'dontfuckingdeploythis')
                    resolve({
                        token: token
                    })
                }
                else
                    reject(boom.unauthorized('Wrong information :b '))
            })
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