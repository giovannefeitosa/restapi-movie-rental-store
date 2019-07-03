const { validationResult } = require('express-validator');

/**
 * @middleware
 * 
 * If the route has validation errors
 * then return error msg with HTTP status 400
 */
module.exports.handleErrors = (req, res, next) => {
  const errors = validationResult(req)
  if(errors.isEmpty()) {
    next();
  } else {
    return res.status(400).json({
      message: errors.errors[0].msg
    });
  }
};
