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
    { storeId: 1, movieId: 1, stock: 5 },
    { storeId: 2, movieId: 1, stock: 0 },
    { storeId: 3, movieId: 1, stock: 2 },

    { storeId: 1, movieId: 2, stock: 2 },
    { storeId: 2, movieId: 2, stock: 0 },
    { storeId: 3, movieId: 2, stock: 1 },

    { storeId: 1, movieId: 3, stock: 4 },
    { storeId: 2, movieId: 3, stock: 0 },
    { storeId: 3, movieId: 3, stock: 4 },
  ]);

  // Already rent some movies
  await models.RentedMovies.bulkCreate([
    { userId: 1, storeId: 3, movieId: 3 },
    { userId: 3, storeId: 3, movieId: 2 },
  ]);

})();
