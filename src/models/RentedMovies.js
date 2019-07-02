const Sequelize = require('sequelize')
const db = require('../sequelize')
const User = require('./User')
const Store = require('./Store')
const Movie = require('./Movie')

const RentedMovies = db.define('rented_movies', {}, {
  underscored: true
})

RentedMovies.belongsTo(User)
RentedMovies.belongsTo(Store)
RentedMovies.belongsTo(Movie)

module.exports = RentedMovies
