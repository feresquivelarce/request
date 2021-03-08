const { ConnectionError, AxiosError, ServerNotResponse } = require('./errors-types')

const adapterConnectionError = (message, error) => { throw new ConnectionError(message, error)}

const adapterAxiosError = (error) => {
    const { message } = error
    throw new AxiosError(message)
}

const adapterServerNotResponse = (message, error) => { throw new ServerNotResponse(message, error)}

module.exports = {
    adapterConnectionError,
    adapterAxiosError,
    adapterServerNotResponse
}