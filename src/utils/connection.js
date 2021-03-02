const { Sequelize } = require('sequelize');
const path = require('path')

const connection = async () => {
    try {
        const sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: path.resolve(__dirname, '../../logs/database.sqlite')
        })
        await sequelize.authenticate();
        console.log('Connection has been established successfully.')
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = { connection }