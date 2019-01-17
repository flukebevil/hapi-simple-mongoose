'use strict'

const Hapi = require('hapi')
const Routes = require('./src/route')
require('dotenv').config()
const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
})
const HapiAuth = require('hapi-auth-jwt2')
const mongoose = require('mongoose')
const init = async () => {
    await mongoose.connect(process.env.DB_HOST, {
        user: process.env.DB_USER,
        pass: process.env.DB_PASSWORD
    }, err => {
        console.log(err)
    })
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    })
    await server.register(HapiAuth)
    await server.auth.strategy('jwt', 'jwt', {
        key: process.env.SECREAT_KEY,
        validate,
        verifyOptions: { algorithms: ['HS256'] }
    })
    server.auth.default('jwt');
    await Routes(server)
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
    return server
}
process.on('ungandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
init().catch(err => {
    console.log(err)
})

const validate = async (decoded, request, h) => {
    const dao = require('./src/model/user')
    try {
        const data = await dao.findOne({ username: decoded.username })
        if (data.err) {
            return { isValid: false }
        }
        else {
            return { isValid: true }
        }
    } catch (err) {
        console.log(err)
    }
}