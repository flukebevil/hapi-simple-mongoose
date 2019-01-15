const JWT = require('hapi-auth-jwt2')

exports.register = (server, option, next) => {
    function validateUser(decoded, request, cb) {
        const userDao = require('../dao/user')
        userDao.findById({ name: decoded.name }, (err, res) => {
            if (err)
                return cb(null, false)
            else {
                return cb(null, true)
            }
        })
    }

    function authToken(err) {
        if (err) return next(err)
        server.auth.strategy('jwt', 'jwt', {
            key: 'dontfuckingdeploythis',
            validate: validateUser,
            verifyOptipns: {
                algorithms: ['HS256']
            }
        })
        server.auth.default('jwt')
        return next()
    }
}