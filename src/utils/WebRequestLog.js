const { connection } = require('./connection');
const { attributes } = require('./helpers');

class WebRequestLog {
    async getInstance() {
        const conn = await connection()
        return conn.define('WebRequestLogs', attributes)
    }
}

module.exports = new WebRequestLog()