const dao = require('../dao/user')

const findAll = () => {
    return new Promise((resolve, reject) => {
        dao.find((err, res) => {
            if (err) reject(res)
            resolve(res)
        })
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

const insertUserData = (id, body) => {
    return new Promise((resolve, reject) => {
        // dao.create()
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

module.exports = {
    findAll,
    findById,
    update,
    insertUserData
}