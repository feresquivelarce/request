const { connection } = require("../utils/connection");
const { adapterConnectionError } = require('../utils/adapters-errors');

describe('Unit Test Of Connection', () => {
    test('Connection', async () => {
        const conn = await connection(adapterConnectionError)
        expect(conn).toBeDefined;
    })
})

