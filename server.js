'use strict'

const Hapi = require('hapi')
const Routes = require('./src/route')
// const server = Hapi.server({
//     port: 3000,
//     host: 'localhost'
// })
const server = new Hapi.Server(+process.env.PORT, '0.0.0.0');
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
    await Routes(server)
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}
process.on('ungandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})
init()