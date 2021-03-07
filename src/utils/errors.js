class ConnectionError extends Error {
    constructor(message) {
        super(message)
        this.name = 'ConectionError'
    }
}

module.exports = { ConnectionError }
