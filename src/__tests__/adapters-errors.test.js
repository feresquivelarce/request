const { adapterServerNotResponse, adapterModelError } = require("../utils/adapters-errors");
const { adapterConnectionError, adapterAxiosError } = require("../utils/adapters-errors");

describe('Unit Test Of Adapters Errors', () => {
    test('expect a throw from AxiosError', () => {
        expect(() => {
            adapterAxiosError({ message: 'axios error' })
        }).toThrowError('axios error')
    })
    test('expect a throw from ModelError', () => {
        expect(() => {
            adapterModelError({ message: 'model error' })
        }).toThrowError('model error')
    })
    test('expect a throw from ServerNotResponse', () => {
        expect(() => {
            adapterServerNotResponse({ message: 'server not response' })
        }).toThrowError('server not response')
    })
    test('expect a throw from ConnectionError', () => {
        expect(() => {
            adapterConnectionError('ConnectionError error', {})
        }).toThrowError('ConnectionError error')
    })
})