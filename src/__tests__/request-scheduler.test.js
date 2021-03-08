const RequestScheduler = require('../libs/request-scheduler');
const { getInstance } = require('../utils/WebRequestLog');

describe('Unit Test of Scheduler', () => {
    test('start', async (done) => {
        try {
            const modelRequest = await getInstance()
            const requestScheduler = new RequestScheduler(modelRequest)
            const response = await requestScheduler.start(10)
            if(!Array.isArray(response)) expect(response).toEqual(expect.stringContaining('Jobs are empty'))
            else expect(response[0]).toBe(1)
            console.info('response de requestScheduler: ', response)
            done()
        } catch (error) {
            done.fail(error)
        }
    })
})