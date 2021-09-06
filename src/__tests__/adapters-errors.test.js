const { adapterServerNotResponse, adapterModelError } = require("../utils/adapters-errors");
const { adapterConnectionError, adapterAxiosError } = require("../utils/adapters-errors");

describe('Unit Test Of Adapters Errors', () => {
    test('expect a throw from AxiosError', () => {
        expect(
            adapterAxiosError({ message: 'axios error' })
        ).toBeDefined;
    })
    test('expect a throw from ModelError', () => {
        expect(
            adapterModelError({ message: 'model error' })
        ).toBeDefined;
    })
    test('expect a throw from ServerNotResponse', () => {
        expect(
            adapterServerNotResponse({ message: 'server not response' })
        ).toBeDefined;
    })
    test('expect a throw from ConnectionError', () => {
        expect(
            adapterConnectionError('ConnectionError error', {})
        ).toBeDefined;
    })
})