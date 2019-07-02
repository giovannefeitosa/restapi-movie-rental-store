const Sequelize = require('sequelize')
const db = require('../sequelize')

const Movie = db.define('movies', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

module.exports = Movie
