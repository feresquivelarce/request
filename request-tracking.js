const axios = require('axios')
const { helpers } = require('@tapp-pay/utils')

const { sendError } = helpers

/**
 * Promise based HTTP client
 * @async
 * @function requestTracking
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
const requestTracking = async params => {
  try {
    const opt = createOptions(params)
    const response = await axios(opt)
    return response.data
  } catch (error) {
    return Object.keys(error).map(i => sendError(error[i]))
  }
}

const createOptions = params => {
  const { method, headers, url, responseType, data } = params
  if (!url) sendError('URL can not be undefined')
  const opt = {
    method: method || 'GET',
    headers: headers || { 'content-type': 'application/json' },
    url,
    responseType: responseType || 'json',
    data: data || null,
  }
  return opt
}

// const setLog = async params => {}

// const setRetrie = async params => {}

module.exports = requestTracking
