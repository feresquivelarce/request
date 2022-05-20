const RequestScheduler = require('../libs/request-scheduler');
const { getInstance } = require('../utils/WebRequestLog');

let requestScheduler
describe('Unit Test of Scheduler', () => {
    test('function findAll', async (done) => {
        try {
            const modelRequest = await getInstance()
            requestScheduler = new RequestScheduler(modelRequest)
            const response = await requestScheduler.findAll(10)
            expect(Array.isArray(response)).toBe(true)
            done()
        } catch (error) {
            done.fail(error)
        }
    })
    test('function execJob', async (done) => {
        try {
            const modelRequest = await getInstance()
            requestScheduler = new RequestScheduler(modelRequest)
            const response = await requestScheduler.execJob([])
            expect(Array.isArray(response)).toBe(false) // expected false cuz res is array empty
            done()
        } catch (error) {
            done.fail(error)
        }
    })
    test('function start', async (done) => {
        try {
            const response = await requestScheduler.start(10)
            if(!Array.isArray(response)) expect(response).toEqual(expect.stringContaining('Jobs are empty'))
            else expect(response[0]).toBe(1)
            console.info('response de requestScheduler: ', response)
            done()
        } catch (error) {
            done.fail(error)
        }
    })

    test('function update', async (done) => {
        try {
            const modelRequest = await getInstance()
            requestScheduler = new RequestScheduler(modelRequest)
            const params = { id: 1 }
            const response = await requestScheduler.update(params, true)
            expect(Array.isArray(response)).toBe(true) 
            done()
        } catch (error) {
            done.fail(error)
        }
    })

    test('function findAll', async (done) => {
        try {
            const modelRequest = await getInstance()
            requestScheduler = new RequestScheduler(modelRequest)
            const response = await requestScheduler.findAll(1)
            expect(Array.isArray(response)).toBe(true) 
            done()
        } catch (error) {
            done.fail(error)
        }
    })
})