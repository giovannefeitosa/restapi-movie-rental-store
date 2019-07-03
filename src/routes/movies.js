const { check } = require('express-validator');
const { handleErrors } = require('../helpers');
const models = require('../models');

module.exports = function(app) {
  app.get('/movies', async (req, res) => {
    let movies = await models.Movie.findAll()
    res.json(movies)
  })
};
