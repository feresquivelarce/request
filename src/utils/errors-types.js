const chalk = require('chalk')
const { red } = chalk
class ConnectionError extends Error {
    constructor(message) {
        super(message)
        this.name = red('❌ Conection Error')
    }
}
class AxiosError extends Error {
    constructor(message,status) {
        super(message)
        this.name = red(`❌ ${message}`)
        this.status = status
    }
}
class ServerNotResponse extends Error {
    constructor(message) {
        super(message)
        this.name =  red('❌ Server Not Response')
    }
}
class ModelError extends Error {
    constructor(message) {
        super(message)
        this.name = red('❌  Model Error')
    }
}

module.exports = { ConnectionError, AxiosError, ServerNotResponse, ModelError }
