const dao = require('../model/user')

const findAll = () => {
    return new Promise((resolve, reject) => {
        dao.find((err, res) => {
            if (err) reject(res)
            resolve(res)
        }).select({ _id: 0, password: 0, __v: 0 })
    })
}

const findById = id => {
    return new Promise((resolve, reject) => {
        dao.findById(id, (err, res) => {
            if (err) reject(err)
            resolve(res)
        })
    })
}

const update = (id, body) => {
    return new Promise((resolve, reject) => {
        dao.findOneAndUpdate(id, { $set: { name: body } }, (err, res) => {
            if (err) reject(err)
            resolve({ success: "true" })
        })
    })
}

const findByName = (name) => {
    return new Promise((resolve, reject) => {
        dao.findOne({ name: name }, (err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

const findUniqueUser = (username) => {
    return dao.findOne({ username: username }).then(result => result, reject => reject)
}

module.exports = {
    findAll,
    findById,
    update,
    findByName,
    findUniqueUser
}