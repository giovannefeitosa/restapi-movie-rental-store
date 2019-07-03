const models = require('../models');

module.exports = function(app) {
  app.get('/stores', async (req, res) => {
    let stores = await models.Store.findAll()
    res.json(stores)
  })
};
