const { toObject } = require('../utils/helpers')
const RequestSOIN = require('./request-soin')

class requestScheduler {
    constructor(model) {
        this.model = model
    }

    async execJob(response) {
        response.map(item => {
            const { id, data, method, url } = item
        })
    }

    async start(limit = 10) {
        const where = { retries: { $gt: sequelize.col('attempts') }, status: -1 }
        const data = await this.model.findAll({ where, limit })
        const response = toObject(data)
        if(response.lenght) await this.execJob(response)
    }
} 