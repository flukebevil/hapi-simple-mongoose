
module.exports = (isSuccess, message, data) => {
    return {
        successful: isSuccess,
        message: message,
        data: data
    }
}