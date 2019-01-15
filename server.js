'use strict'

const Hapi = require('hapi')
const Routes = require('./src/route')
const server = Hapi.server({
    port: 3000,
    host: 'localhost'
})
const HapiAuth = require('hapi-auth-jwt2')
const mongoose = require('mongoose')
const init = async () => {
    await mongoose.connect('mongodb://localhost/mydb')
    await server.register({
        plugin: require('hapi-pino'),
        options: {
            prettyPrint: true,
            logEvents: ['response', 'onPostStart']
        }
    })
    await server.register(HapiAuth)
    server.auth.strategy('jwt', 'jwt', {
        key: 'dontfuckingdeploythis',
        verify: validate,
        verifyOptions: { algorithms: ['HS256'] }
    })
    server.auth.default('jwt');
    await Routes(server)
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}
process.on('ungandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
init().catch(err => {
    console.log(err)
})

const validate = async (decoded, request) => {
    console.log(decoded)
    if (decoded && decoded.sub) {
       return { isValid: true }
    }
    return { isValid: false }
  }