const requestTracking = require('../request-tracking')

const url = 'https://60300165a1e9d20017af15f2.mockapi.io/posts'
const mock = {
  id: 1,
  createdAt: '2021-02-19T02:19:50.782Z',
  name: 'Ansel Schultz',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg',
}
describe('Unit Test of request-tracking', () => {
  test('GET ', async () => {
    const response = await requestTracking({ url })
    expect(typeof response).toBe('object')
  })
  test('Not found URL', async () => {
    expect(async () => {
      await requestTracking({
        url: 'https://run.mocky.io/v3/f0895465-1e5b-43aa-8c5a-0badec7662ce',
      }).toThrow()
    })
  })
  test('POST', async () => {
    const opt = { url, data: mock, method: 'POST' }
    const response = await requestTracking(opt)
    expect(typeof response).toBe('object')
  })
  test('PUT', async () => {
    const opt = { url: `${url}/2`, data: mock, method: 'PUT' }
    const response = await requestTracking(opt)
    expect(typeof response).toBe('object')
  })
  test('DELETE', async () => {
    const opt = { url: `${url}/2`, method: 'DELETE' }
    const response = await requestTracking(opt)
    expect(typeof response).toBe('object')
  })
})
