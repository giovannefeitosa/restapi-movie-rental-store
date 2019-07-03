const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET = 'hire-me';

module.exports = {
  /**
   * Get access token for a user
   */
  encodeUser(user) {
    let access_token = jwt.sign({ iss: user.id }, SECRET);
    return { access_token, user }
  },

  /**
   * Middleware to decode token and set current user to request object
   */
  decodeToken(req, res, next) {
    let token = req.headers['authorization']
    
    if(!token || token.indexOf('Bearer ') !== 0) {
      return res.status(403).json({
        message: 'Invalid token'
      });
    }

    token = token.substr(7);
    
    let decoded = jwt.verify(token, SECRET);
    
    if(!decoded) {
      return res.status(403).json({
        message: 'Invalid token'
      });
    }

    User.findByPk(decoded.iss).then(user => {
      req.user = user;
      next();
    }).catch(err => {
      return res.status(500).json({
        message: 'Server error',
        err
      });
    });
  }
}
