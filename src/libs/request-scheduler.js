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

    async start() {
        const where = { retries: { $gt: sequelize.col('attempts') } }
        const data = await this.model.findAll({ where })
        const response = toObject(data)
        if(response.lenght) await this.execJob(response)
    }
} 