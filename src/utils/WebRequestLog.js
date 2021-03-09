const { adapterConnectionError } = require('./adapters-errors');
const { connection } = require('./connection');
const { attributes } = require('./helpers');


class WebRequestLog {
    async getInstance() {
        const conn = await connection(adapterConnectionError)
        return conn.define('WebRequestLogs', attributes)
    }
}

module.exports = new WebRequestLog()