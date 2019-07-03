const models = require('../models');

module.exports = function(app) {
  app.get('/stores', async (req, res) => {
    let stores = await models.Store.findAll()
    res.json(stores)
  });

  app.get('/stores/:store_id/movies', async (req, res) => {
    let storeId = req.params.store_id;
    let stocks = await models.Stock.findAll({
      where: {
        storeId
      },
      include: [{
        model: models.Movie
      }]
    });

    // parse stocks
    let movies = []
    for(let stock of stocks) {
      let movie = stock.movie.toJSON();
      movie.stock = stock.stock;
      movies.push(movie);
    }

    res.json(movies)
  });
};
