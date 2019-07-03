const _ = require('lodash');
const models = require('../models');
const sequelize = require('../sequelize');

module.exports = function(app) {
  app.get('/movies', async (req, res) => {
    let _movies = await models.Movie.findAll();
    
    // Fetch stocks
    let qry = await sequelize.query('select movie_id, sum(stock) as cont from stocks group by movie_id');
    let stocks = qry[0];

    let movies = [];

    // Parse movies
    for(let i in _movies) {
      let movie = _movies[i].toJSON();
      let movie_id = movie.id;
      let stock_row = _.find(stocks, { movie_id });
      movies.push({
        ...movie,
        stock: stock_row.cont
      });
    }
    
    res.json(movies)
  })
};
