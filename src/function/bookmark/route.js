const controller = require('./controller')
const makeBookmark = require('../../schema/makeBookmark')

module.exports = server => {

    server.route({
        path: '/bookmark',
        method: 'POST',
        config: {
            auth: 'jwt',
            validate: {
                payload: makeBookmark
            },
            handler: controller.bookmark
        }
    });
}