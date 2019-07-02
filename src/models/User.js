const Sequelize = require('sequelize')
const db = require('../sequelize')

const User = db.define('users', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: 'user_email'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  }
}, {
  underscored: true,
})

module.exports = User
