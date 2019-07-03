const { check } = require('express-validator');
const { handleErrors } = require('../helpers');
const models = require('../models')
// const bcrypt = require('bcrypt');
const md5 = require('md5')
const jwt = require('jsonwebtoken');

module.exports = function(app) {
  /**
   * List all users
   */
  app.get('/users', async (req, res) => {
    let users = await models.User.findAll()
    res.json(users)
  });

  /**
   * Login - get access token
   */
  app.post('/login', [

    check('email').isEmail().withMessage('Invalid email'),
    check('password').isString().withMessage('Missing password'),
    handleErrors

  ], async (req, res) => {
    
    let user = await models.User.findOne({where: {email: req.body.email}})

    if(!user) {
      return res.status(403).json({
        message: 'E-mail not found'
      });
    }
    
    if(user.password !== md5(req.body.password)) {
      return res.status(403).json({
        message: 'Invalid password'
      });
    }

    let access_token = jwt.sign({ iss: user.id }, 'hire-me');

    return res.json({ access_token, user });

  });

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
