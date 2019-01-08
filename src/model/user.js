const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.pre('save', next => {
    if (this.isModified('password')) return next()
    bcrypt.getSalt(10, (err, salt) => {
        if (err) return next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)