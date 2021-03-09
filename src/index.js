// const RequestScheduler = require('../libs/request-scheduler');
// const { getInstance } = require('../utils/WebRequestLog');

// const run = async () => {
//     // try {
//     //     const modelRequest = await getInstance()
//     //     const requestScheduler = new RequestScheduler(modelRequest)
//     //     const response = await requestScheduler.start(10)
//     //     // if(!Array.isArray(response)) expect(response).toEqual(expect.stringContaining('Jobs are empty'))
//     //     // else expect(response[0]).toBe(1)
//     //     console.info('response de requestScheduler: ', response)
//     // } catch (error) {
//     //     console.error(error)
//     // } finally {
//     //     console.log('We do cleanup here')
//     // }
//     const modelRequest = await getInstance()
//     const requestScheduler = new RequestScheduler(modelRequest)
//     const response = await requestScheduler.start(10)
//     // if(!Array.isArray(response)) expect(response).toEqual(expect.stringContaining('Jobs are empty'))
//     // else expect(response[0]).toBe(1)
//     console.info('response de requestScheduler: ', response)
// }

// run()

const axios = require('axios')
const { adapterAxiosError } = require('./utils/adapters-errors')
const { optionsTesting } = require('./utils/helpers')
const { url, falseUrl, mock } = optionsTesting
const { createError, createRequestOptions } = require('./utils/helpers')

  /**
   * Promise function based on HTTP client
   * @async
   * @function Request
   * @param {object} params - Object
   * @property {string}  params.method - Default GET
   * @property {object}  params.headers - Default { content-type: application/json }
   * @property {string}  params.url - Required
   * @property {string}  params.responseType - Default json
   * @property {object}  params.data - Default null
   * @return {array} The data from the URL.
   */
   const Request = async params => {
    try {
      const opt = createRequestOptions(params)
      const response = await axios(opt)
      const { data } = response
      return data
    } catch (error) {
      // adapterAxiosError(error)
      throw new Error(error.message)
    } 
  }

//   const handleErrors = (error) => {
//       const { isAxiosError, response, code,errno, message,syscall } = error
//       console.log('isAxiosError', isAxiosError)
//     //   console.log('response', response)
//     //   console.log('config', error.config);
//         console.log('code', code)
//         console.log('errno', errno)
//         console.log('syscall', syscall)
//         console.log('message', message) 
//         console.log('code', error.stack);
// }

Request({ url: falseUrl })
// Request({ url: 'http://guqrhgqk.com' })
