const Sequelize = require('sequelize')
const db = require('../sequelize')

const Store = db.define('stores', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Store
