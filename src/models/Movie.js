const Sequelize = require('sequelize')
const db = require('../sequelize')

const Movie = db.define('movies', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  director: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  underscored: true
})

module.exports = Movie
