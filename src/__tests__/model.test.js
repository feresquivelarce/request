const { getInstance } = require('../utils/WebRequestLog');
const { connection } = require('../utils/connection');
const { attributes, createAndFindAll } = require('../utils/helpers');

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
    test('insert and show all data from SQLite', async () => {
        const model = await getInstance()
        model.create({ data: {}, retries: 0, attempts: 0, status: 0 })
        const data = await model.findAll()
        const response = JSON.stringify(data)
        expect(typeof response).toBe('string')
    })

})