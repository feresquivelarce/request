const { getInstance } = require('./WebRequestLog')

const start = async () => {
    const WebRequestLogs = await getInstance()
    const webRequest = {
        data: {},
        retries: 0,
        attempts: 0,
        status: 0 // pendient
    }
    WebRequestLogs.create(webRequest)
    const data = await WebRequestLogs.findAll()
    const response = JSON.stringify(data)
    console.log('response', JSON.parse(response))
}

start()