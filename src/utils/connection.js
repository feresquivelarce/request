const { Sequelize } = require('sequelize');
const path = require('path')

const connection = async (connectionError) => {
    try {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.resolve(__dirname, '../../logs/database.sqlite')
        })
        await sequelize.authenticate();
        // sequelize.sync()
        console.info('Connection has been established successfully.')
        return sequelize
    } catch (error) {
        connectionError('Unable to connect to the database:', error)
    }
}

module.exports = { connection }