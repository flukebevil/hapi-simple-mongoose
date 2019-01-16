const dao = require('../model/user')

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
    return new Promise((resolve, reject) => {
        dao.findOne({ username: username }, (err, res) => {
            if (err)
                reject(err)
            else {
                if (res == null) 
                    resolve(false)
                else 
                    resolve(true)
            }
        })
    })
}

module.exports = {
    findAll,
    findById,
    update,
    insertUserData,
    findByName,
    findUniqueUser
}