const axios = require('axios')
const { sendError, createRequestOptions } = require('./helpers')
  /**
   * Promise based HTTP client
   * @async
   * @function RequestSOIN
   * @param {object} params - Object
   * @property {string}  params.method - Default GET
   * @property {object}  params.headers - Default { content-type: application/json }
   * @property {string}  params.url - Required
   * @property {string}  params.responseType - Default json
   * @property {object}  params.responseType - Default null
   * @property {object}  params.retries - Default null
   * @property {object}  params.log - Default null
   * @return {array} The data from the URL.
   */
   const RequestSOIN = async params => {
    try {
      const opt = createRequestOptions(params)
      const response = await axios(opt)
      return response.data
    } catch (error) {
      return Object.keys(error).map(i => sendError(error[i]))
    }
  }

  
  // const setLog = async params => {}
  
  // const setRetries = async params => {}
  

module.exports = RequestSOIN
