const { ServerNotResponse, ModelError } = require("../utils/errors-types");
const { ConnectionError, AxiosError } = require("../utils/errors-types");

describe('Unit Test Of Errors Types', () => {
    test('expect a throw from AxiosError', () => {
        expect(() => {
            throw new AxiosError('axios error')
        }).toThrowError('axios error')
    })
    test('expect a throw from ModelError', () => {
        expect(() => {
            throw new ModelError('model error')
        }).toThrowError('model error')
    })
    test('expect a throw from ServerNotResponse', () => {
        expect(() => {
            throw new ServerNotResponse('server not response')
        }).toThrowError('server not response')
    })
    test('expect a throw from ConnectionError', () => {
        expect(() => {
            throw new ConnectionError('ConnectionError error')
        }).toThrowError('ConnectionError error')
    })
})