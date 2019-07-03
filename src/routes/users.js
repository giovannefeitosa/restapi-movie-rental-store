const { check, validationResult } = require('express-validator');
const { handleErrors } = require('../helpers');
const models = require('../models')
// const bcrypt = require('bcrypt');
const md5 = require('md5')

module.exports = function(app) {
  app.get('/users', async (req, res) => {
    let users = await models.User.findAll()
    res.json(users)
  })

  /**
   * Create user
   */
  app.post('/users', [
    
    check('name').isString().withMessage('Name must be a string'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 3 }).withMessage('Password must have at least 3 chars'),
    handleErrors

  ], async (req, res) => {
    
    let user = {...req.body}
    
    // I would use bcrypt in real world
    // user.password = await bcrypt.hash(user.password, 10)
    user.password = md5(user.password)

    // Create and outputs the user
    models.User.create(user).then(
      user => res.json(user)
    ).catch(err => {
      if(err.errors && err.errors[0] && err.errors[0].type === 'unique violation') {
        res.status(400).json({
          message: 'This email is already in use'
        })
      } else {
        res.status(400).json({
          message: 'Unknown error',
          err
        })
      }
    })

  });
};
