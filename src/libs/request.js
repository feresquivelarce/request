const axios = require('axios')
const { adapterAxiosError } = require('../utils/adapters-errors')
const { createRequestOptions } = require('../utils/helpers')

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
   const Request = async (params) => {
    try {
      const opt = createRequestOptions(params)
      const response = await axios(opt)
      const { data } = response
      return data
    } catch (error) {
      adapterAxiosError(error)
    } 
  }

module.exports = Request
