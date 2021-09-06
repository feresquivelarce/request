const { createRequestOptions, printError } = require("../utils/helpers");

describe('Unit Test Of Errors Types', () => {
    test('Print Error', () => {
        const error =  printError({ message: "error" })
        expect(error).not.toBeNull;
    })

    test('Create Request Options', () => {
        const params = { url: "test"}
        const opt = createRequestOptions(params)
        expect(opt).toStrictEqual({
            method: 'GET',
            headers: { 'content-type': 'application/json' },
            url: 'test',
            responseType: 'json',
            data: null
        })
    })
})