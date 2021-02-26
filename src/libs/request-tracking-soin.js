const { sendError } = require('./helpers')
const RequestSOIN = require('./request-soin')

/**
   * Promise based HTTP client with retries and log database
   * @async
   * @function RequestTrackingSOIN
   * @param {object} params - Object
   * @property {string}  params.method - Default GET
   * @property {object}  params.headers - Default { content-type: application/json }
   * @property {string}  params.url - Required
   * @property {string}  params.responseType - Default json
   * @property {object}  params.retries - Default null
   * @property {object}  params.log - Default null
   * @return {array} The data from the URL.
   */

class RequestTrackingSOIN {
    constructor(model) {
        this.model = model
        this.currentWebRequestLog = null
    }
    RequestTracking = async params => {
        try {
            const { log } = params
            if(log) this.currentWebRequestLog = await this.createLog(params)
            const response = await RequestSOIN(params)

            if(log && response) {
                await this.updateLog({ status: 1, attempts: 1, response })
            }
        } catch (error) {
            if (error && webRequestLog) {
                const webLog = {
                    status: -1,
                    error: error.stack,
                    response: error,
                    attempts: 1,
                }
                await this.updateLog(webLog)
            }
            sendError(error)
        }
    }

    createLog = async (opt) => {
        const { params } = opt
        try {
            const { retries } = params     
            const webRequest = {
                params,
                retries: retries || 0,
                attempts: 0,
                status: 0 // pendint
            }
            this.currentWebRequestLog = await this.model.create(webRequest)
            return true
        } catch (error) {
            sendError(error)
        }
    }

    updateLog = async (opt) => {
        try {
            this.currentWebRequestLog = await this.model.create(opt)
            return true
        } catch (error) {
            sendError(error)
        }
    }
}

module.exports = RequestTrackingSOIN