const { getInstance } = require('../utils/WebRequestLog');
const { connection } = require('../utils/connection');
const { attributes } = require('../utils/helpers');

const getWebRequestLogMock = async () => {
    const conn = await connection()
    return conn.define('WebRequestLogs', attributes)
}

describe('Unit Test of Model WebRequestLog', () => {
    test('is WebRequestLog a instance of Sequelize?', async () => {
        const modelWebRequestLog = await getInstance()
        const modelMock = await getWebRequestLogMock()
        expect(JSON.stringify(modelWebRequestLog)).toBe(JSON.stringify(modelMock))
    })
    test('show all data from SQLite', async () => {
        const model = await getInstance()
        const data = await model.findAll()
        const response = JSON.stringify(data)
        console.log('data from SQLite', response);
        expect(typeof response).toBe('string')
    })
})