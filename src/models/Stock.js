const Sequelize = require('sequelize')
const db = require('../sequelize')
const Store = require('./Store')
const Movie = require('./Movie')

const Stock = db.define('stocks', {
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  underscored: true
})

Stock.belongsTo(Store)
Stock.belongsTo(Movie)

module.exports = Stock
