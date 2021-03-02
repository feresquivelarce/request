const RequestTrackingSOIN = require('../libs/request-tracking-soin')
const { getInstance } = require('../utils/WebRequestLog')
let request
const url = 'https://60300165a1e9d20017af15f2.mockapi.io/posts'
let ID = 0
const mock = {
  id: 1,
  createdAt: '2021-02-19T02:19:50.782Z',
  name: 'Ansel Schultz',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg',
}

const retriesAndLog = {
  retries: 3, log: true
}

describe('Unit Test of RequestTracking SOIN', async () => {
  test('GET ALL', async () => {
    const modelRequest = await getInstance()
    request = new RequestTrackingSOIN(modelRequest)
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
      const response = await request.RequestTracking({
        url: 'https://run.mocky.io/v3/f0895465-1e5b-43aa-8c5a-0badec7662ce',
        ...retriesAndLog
      })
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
})
