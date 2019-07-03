const md5 = require('md5');
const models = require('./models');

// Auto executable function
(async () => {
  
  // Count users
  let count = await models.User.count();

  if(count) {
    console.info('Database is already seeded')
    return;
  }

  let password = md5('123');

  // Insert users
  await models.User.bulkCreate([
    { name: 'Giovanne Afonso', email: 'giovanneafonso@gmail.com', password },
    { name: 'John Doe', email: 'johndoe@example.com', password },
    { name: 'Great Dev', email: 'greatdev@example.com', password },
  ]);

  // Insert movies
  await models.Movie.bulkCreate([
    { title: 'Os Vingadores', director: 'Joss Whedon' },
    { title: 'Homem de Ferro 3', director: 'Shane Black' },
    { title: 'Capitão América: O Primeiro Vingador', director: 'Joe Johnston' },
  ]);

  // Insert stores
  await models.Store.bulkCreate([
    { name: 'Action Movies' },
    { name: 'Meta' },
    { name: 'Hire Great Dev' },
  ]);

  // Fill Stocks
  await models.Stock.bulkCreate([
    { store_id: 1, movie_id: 1, stock: 5 },
    { store_id: 2, movie_id: 1, stock: 0 },
    { store_id: 3, movie_id: 1, stock: 2 },

    { store_id: 1, movie_id: 2, stock: 2 },
    { store_id: 2, movie_id: 2, stock: 0 },
    { store_id: 3, movie_id: 2, stock: 1 },

    { store_id: 1, movie_id: 3, stock: 4 },
    { store_id: 2, movie_id: 3, stock: 0 },
    { store_id: 3, movie_id: 3, stock: 4 },
  ]);

  // Already rent some movies
  await models.RentedMovies.bulkCreate([
    { user_id: 1, store_id: 3, movie_id: 3 },
    { user_id: 3, store_id: 3, movie_id: 2 },
  ]);

})();
