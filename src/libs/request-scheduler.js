const RequestSOIN = require('./request-soin')
const { Sequelize } = require('sequelize');
const { Op } = Sequelize
const { optionsTesting } = require('../utils/helpers')
const { falseUrl } = optionsTesting
class RequestScheduler {
    constructor(model) {
        this.model = model
    }

    async execJob(res) {
        const resultPromise = res.map(async item => {
            console.log('item',);
            const { id, attempts, method, url, data } = item
            const dataRequest = await RequestSOIN({ url, method, data })
            const { response } = dataRequest
            const dataUpdated = await this.model.update(
                { 
                    attempts: attempts + 1, 
                    status: 1, 
                    response 
                },
                { where: { id } },
            )
            return dataUpdated
        })
        const resultResolve = await Promise.all(resultPromise)
        return resultResolve[0]
    }

    async start(limit = 10) {
        const retries = { [Op.gte]: Sequelize.col('attempts')}
        const status = -1
        const where = { retries, status }
        const data = await this.model.findAll({ where, limit })
        const parsedData = JSON.stringify(data)
        const res = JSON.parse(parsedData)
        if(!res.length) return 'Jobs are empty'
        return await this.execJob(res)
    }
} 

module.exports = { RequestScheduler }