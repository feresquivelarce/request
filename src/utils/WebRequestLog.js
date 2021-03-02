const { connection } = require('./connection');
const { attributes } = require('./helpers');

class WebRequestLog {
    async getInstance() {
        const conn = await connection()
        conn.define('WebRequestLogs', attributes)
        conn.sync()
        return conn.define()
    }
}

module.exports = new WebRequestLog()