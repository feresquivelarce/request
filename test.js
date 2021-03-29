const { Request } = require('./index')
const { RequestTracking } = require('./index')
const { getInstance } = require('./src/utils/WebRequestLog')
const { optionsTesting } = require('./src/utils/helpers')
const { url, falseUrl, mock, retriesAndLog } = optionsTesting


const run = async() => {
    const modelRequest = await getInstance()
    const request = new RequestTracking(modelRequest)
    const params = {
        method: 'get',
        url, 
    }
    // const response = await Request(params)
    const response = await request.RequestTracking({ url, ...retriesAndLog })
    console.log('response', response)
}

run()