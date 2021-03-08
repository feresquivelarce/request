const Request = require('./request')
const { Sequelize } = require('sequelize');
const { adapterModelError } = require('../utils/adapters-errors');
const { Op } = Sequelize

class RequestScheduler {
    constructor(model) {
        this.model = model
    }

    async execJob(res) {
        try {
            const resultPromise = res.map(async item => {
                const { method, url, data } = item
                const response = Request({ url, method, data })
                return this.update(item, response)
            })
            const resultResolve = await Promise.all(resultPromise)
            console.log('resultResolve[0]', resultResolve[0]);
            return resultResolve[0]
        } catch (error) {
            console.error(error.message)
        }
    }

    async update(params, response) {
        console.log('params, response', params, response);
        try {
            const { id, attempts = 1 } = params
            const opt = {
                attempts: attempts + 1,
                status: 1,
                response
            }
            return await this.model.update(opt, { where: { id } })
        } catch (error) {
            adapterModelError(error)
        }  
    }

    async findAll(limit) {
        try {
            const retries = { [Op.gte]: Sequelize.col('attempts')}
            const where = { retries, status: -1 }
            const data = await this.model.findAll({ where, limit })
            const parsedData = JSON.stringify(data)
            return JSON.parse(parsedData)
        } catch (error) {
            adapterModelError(error)
        }
    }

    async start(limit = 10) {
        const res = []
        try {
            const result = await this.findAll(limit)
            if(!result.length) return 'Jobs are empty'
            res.success = await this.execJob(result)
            return res
        } catch (error) {
            res.errors = error
            console.error(res)
        } finally {
            return res
        }
    }
} 

module.exports = RequestScheduler