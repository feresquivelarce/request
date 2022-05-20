const RequestTracking = require('../libs/request-tracking')
const { optionsTesting } = require('../utils/helpers')
const { getInstance } = require('../utils/WebRequestLog')
const { url, falseUrl, mock, retriesAndLog } = optionsTesting
let request

let ID = 0
describe('Unit Test of Tracking', () => {
  test('GET ALL', async () => {
    const modelRequest = await getInstance()
    request = new RequestTracking(modelRequest)
    const response = await request.RequestTracking({ url, ...retriesAndLog })
    ID = response[0].id
    expect(typeof response).toBe('object')
  })

  test('GET ONE', async () => {
    const response = await request.RequestTracking({ url: `${url}/${ID}`, ...retriesAndLog })
    expect(typeof response).toBe('object')
  })
  
  test('GET Not found URL', async () => {
    expect(async ()=> {
      const response = await request.RequestTracking({ url: falseUrl, ...retriesAndLog })
      expect(response).toThrow()
    }) 
  })

  test('POST', async () => {
    const opt = { url, data: mock, method: 'POST', ...retriesAndLog }
    const response = await request.RequestTracking(opt)
    expect(typeof response).toBe('object')
  })

  test('PUT', async () => {
    const opt = { url: `${url}/${ID}`, data: mock, method: 'PUT', ...retriesAndLog }
    const response = await request.RequestTracking(opt)
    expect(typeof response).toBe('object')
  })

  test('DELETE', async () => {
    const opt = { url: `${url}/${ID}`, method: 'DELETE', ...retriesAndLog }
    const response = await request.RequestTracking(opt)
    expect(typeof response).toBe('object')
  })

  test('Create Log', async () => {
    const opt = { data: 'test' }
    const response = await request.createLog(opt)
    expect(response).toBe(true)
  })

  test('Update Log', async () => {
    const opt = { data: 'test' }
    const response = await request.updateLog(opt)
    expect(response).toBe(true)
  })
})
