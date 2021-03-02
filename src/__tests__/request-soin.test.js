const RequestSOIN = require('../libs/request-soin')

const url = 'https://60300165a1e9d20017af15f2.mockapi.io/posts'
let ID = 0
const mock = {
  id: 1,
  createdAt: '2021-02-19T02:19:50.782Z',
  name: 'Ansel Schultz',
  avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/yehudab/128.jpg',
}
describe('Unit Test of Request SOIN', () => {

  test('GET ALL', async () => {
    const response = await RequestSOIN({ url })
    ID = response[0].id
    expect(typeof response).toBe('object')
  })

  test('GET ONE', async () => {
    const response = await RequestSOIN({ url: `${url}/${ID}` })
    expect(typeof response).toBe('object')
  })

  test('Not found URL', async () => {
    expect(async () => {
      const response = await RequestSOIN({ url: 'https://run.mocky.io/v3/f0895465-1e5b-43aa-8c5a-0badec7662ce' })
      expect(response).toThrow()
    })
  })

  test('POST', async () => {
    const opt = { url, data: mock, method: 'POST' }
    const response = await RequestSOIN(opt)
    expect(typeof response).toBe('object')
  })

  test('PUT', async () => {
    const opt = { url: `${url}/${ID}`, data: mock, method: 'PUT' }
    const response = await RequestSOIN(opt)
    expect(typeof response).toBe('object')
  })
  
  test('DELETE', async () => {
    const opt = { url: `${url}/${ID}`, method: 'DELETE' }
    const response = await RequestSOIN(opt)
    expect(typeof response).toBe('object')
  })
})
