const { check } = require('express-validator');
const { handleErrors } = require('../helpers');
const auth = require('../resources/auth');
const models = require('../models');
const sequelize = require('../sequelize');

module.exports = function(app) {
  app.post('/rent_movie', auth.protectRoute, [
    
    check('store_id').isInt().withMessage('Invalid store_id'),
    check('movie_id').isInt().withMessage('Invalid movie_id'),
    check('quantity').optional().isInt().withMessage('Invalid quantity'),
    handleErrors

  ], async (req, res) => {
    
    let storeId = req.body.store_id;
    let movieId = req.body.movie_id;
    let quantity = req.body.quantity || 1;

    ////////////////////////////////////////////////////////////
    // Check stock
    let stockRow = await models.Stock.findOne({where:{storeId,movieId}});
    
    if(!stockRow || stockRow.stock < quantity) {
      return res.status(403).json({
        message: 'Out of stock'
      });
    }

    ////////////////////////////////////////////////////////////
    // Update rented_movies table

    let rentInfo = await models.RentedMovies.findOrCreate({
      where: { storeId, movieId },
      defaults: { quantity }
    });

    let rentedMovie = rentInfo[0];
    let created = rentInfo[1];

    if(!created) {
      models.RentedMovies.update({
        quantity: rentedMovie.quantity + quantity,
      }, {where: { storeId, movieId }});
    }

    ////////////////////////////////////////////////////////////
    // Update stocks table

    await models.Stock.update({
      stock: stockRow.stock - quantity,
    }, {where: { storeId, movieId }});

    ////////////////////////////////////////////////////////////
    // Return

    // If you want to return detailed data:
    
    // rentedMovie = await models.RentedMovies.findOne({
    //   where: {storeId, movieId},
    //   include: [{
    //     model: models.Movie
    //   }, {
    //     model: models.Store
    //   }]
    // });

    res.json({ success: true });
  });

  app.post('/return_movie', auth.protectRoute, [
    
    check('store_id').isInt().withMessage('Invalid store_id'),
    check('movie_id').isInt().withMessage('Invalid movie_id'),
    check('quantity').optional().isInt().withMessage('Invalid quantity'),
    handleErrors

  ], async (req, res) => {

    let storeId = req.body.store_id;
    let movieId = req.body.movie_id;
    let quantity = req.body.quantity || 1;
    quantity = parseInt(''+quantity);
    
    // Check if user has really rented this movie
    let rentedMovie = await models.RentedMovies.findOne({where: {storeId, movieId}});

    if(!rentedMovie) {
      return res.status(403).json({
        message: 'You don\'t need to return this movie'
      });
    }

    // Check if user is returning right quantity
    let rented_quantity = rentedMovie.quantity;

    if(quantity > rented_quantity) {
      return res.status(403).json({
        message: 'Sorry, we don\'t accept free movies, please return only ' + rented_quantity
      });
    }

    // Update rented_movies table
    await models.RentedMovies.update({
      quantity: rented_quantity - quantity
    }, {where: {storeId, movieId}});

    // Update stocks table
    // Relaaaax, it's an integer
    await sequelize.query(`update stocks set stock = stock + ${quantity}`);

    return res.json({success: true});
  });
};
