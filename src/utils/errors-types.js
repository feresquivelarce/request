class ConnectionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Conection Error'
    }
}
class AxiosError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Axios HTTP Error'
    }
}
class ServerNotResponse extends Error {
    constructor(message) {
        super(message)
        this.name = 'Server Not Response'
    }
}
class ModelError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Model Error'
    }
}

module.exports = { ConnectionError, AxiosError, ServerNotResponse, ModelError }
