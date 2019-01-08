const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) return next()
        bcrypt.hash(this.password, 10, (err, hash) => {
            if (err) return next(err)
            console.log(hash)
            this.password = hash
            next()
    })
})

UserSchema.methods.comparePassword = (candidatePassword, callback) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return callback(err)
        callback(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema)