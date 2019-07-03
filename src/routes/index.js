module.exports = function(app) {
  
  require('./users')(app);
  require('./movies')(app);
  
}
