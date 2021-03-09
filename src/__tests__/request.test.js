const Request = require('../libs/request')
const { optionsTesting } = require('../utils/helpers')
const { falseUrl, url, mock } = optionsTesting
let ID = 0

describe('Unit Test of Request SOIN', () => {

  test('GET ALL', async () => {
    const response = await Request({ url })
    ID = response[0].id
    expect(typeof response).toBe('object')
  })

  test('GET ONE', async () => {
    const response = await Request({ url: `${url}/${ID}` })
    expect(typeof response).toBe('object')
  })

  test('Not found URL', async () => {
    expect(async () => {
      const response = await Request({ url: falseUrl })
      expect(response).toThrow()
    })
  })

  test('POST', async () => {
    const opt = { url, data: mock, method: 'POST' }
    const response = await Request(opt)
    expect(typeof response).toBe('object')
  })

  test('PUT', async () => {
    const opt = { url: `${url}/${ID}`, data: mock, method: 'PUT' }
    const response = await Request(opt)
    expect(typeof response).toBe('object')
  })
  
  test('DELETE', async () => {
    const opt = { url: `${url}/${ID}`, method: 'DELETE' }
    const response = await Request(opt)
    expect(typeof response).toBe('object')
  })
})
