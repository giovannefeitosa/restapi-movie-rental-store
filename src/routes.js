const { check, validationResult } = require('express-validator');

/**
 * If the route has validation errors
 * then return error msg with HTTP status 400
 */
const handleErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    next()
  } else {
    return res.status(400).json({
      message: errors[0].msg
    })
  }
}

module.exports = function(app) {
  
  app.post('/users', [
    
    check('name').isString().withMessage('Name must be a string'),
    check('email').isEmail().withMessage('Invalid email'),
    check('password').isLength({ min: 3 }).withMessage('Password must have at least 3 chars'),
    handleErrors

  ], (req, res) => {
    
    

  });
  
}
