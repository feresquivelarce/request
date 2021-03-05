const { sendError } = require('../utils/helpers')
const Request = require('./request')

/**
   * Promise Class based on HTTP client with retries and log database
   * @class RequestTrackingSOIN
   * @return {class} The class RequestTrackingSOIN.
   */
class RequestTracking {
    /**
     *  @param {object} model - Required Sequelize Object 
     */
    constructor(model) {
        this.model = model
        this.currentWebRequestLog = null
    }

    /**
   * Promise based HTTP on client with retries and log database
   * @async
   * @function RequestTracking
   * @param {object} params - Object
   * @property {string}  params.method - Default GET
   * @property {object}  params.headers - Default { content-type: application/json }
   * @property {string}  params.url - Required
   * @property {string}  params.responseType - Default json
   * @property {object}  params.data - Default null
   * @property {number}  params.retries - Default null
   * @property {boolean}  params.log - Default null
   * @return {array} The data from the URL.
   */
    async RequestTracking(params) {
        try {
            const { log } = params
            if(log) await this.createLog(params)
            const response = await RequestSOIN(params)
            if(log && response) await this.updateLog({ status: 1, attempts: 1, response, ...params })
            return response
        } catch (error) {
            if (error && this.currentWebRequestLog) {
                const webLog = {
                    status: -1,
                    error: error.stack,
                    response: error,
                    attempts: 1,
                    ...params
                }
                await this.updateLog(webLog)
            }
            sendError(error)
        }
    }

    async createLog (opt) {
        const { data, retries, method = 'GET' } = opt
        try {
            const webRequest = {
                data,
                retries: retries || 0,
                attempts: 0,
                status: 0, // pendient,
                ...opt,
                method
            }
            this.currentWebRequestLog = await this.model.create(webRequest)
            return true
        } catch (error) {
            sendError(error)
        }
    }

    async updateLog (opt) {
        try {
            const { method = 'GET'} = opt
            await this.currentWebRequestLog.update({...opt, method})
            return true
        } catch (error) {
            sendError(error)
        }
    }

}

module.exports = RequestTracking