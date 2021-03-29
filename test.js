const { Request } = require('./index')
const url = 'https://60300165a1e9d20017af15f2.mockapi.io/posts'


const run = async() => {
    const params = {
        method: 'get',
        url, 
    }
    const response = await Request(params)
    console.log('response', response)
}

run()