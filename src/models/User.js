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
});

// Hide password
User.prototype.toJSON = function() {
  var values = {...this.get()};
  delete values.password;
  return values;
}

module.exports = User
