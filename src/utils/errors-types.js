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
class ServerNotResponse extends Error {
    constructor(message) {
        super(message)
        this.name = 'Server Not Response'
    }
}

module.exports = { ConnectionError, AxiosError, ServerNotResponse }
