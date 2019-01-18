const controller = require('./controller')
const makeBookmark = require('../../schema/makeBookmark')

module.exports = server => {

    server.route({
        path: '/bookmark',
        method: 'PUT',
        config: {
            auth: 'jwt',
            validate: {
                payload: makeBookmark
            },
            handler: controller.bookmark
        }
    });

    server.route({
        path: '/bookmark',
        method: 'GET',
        config: {
            handler: controller.getBookmarkAll,
            auth: 'jwt'
        }
    });
}