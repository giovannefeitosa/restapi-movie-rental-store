module.exports = function(app) {
  
  require('./users')(app);
  require('./movies')(app);
  require('./stores')(app);
  require('./rent')(app);
  
}
