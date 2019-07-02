const express = require('express');
const app = express();
const sequelize = require('./sequelize')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


var CONNECTION_ATTEMPTS = 10;

async function startApplication() {

  // Connect to database before listening to requests
  sequelize.authenticate().then(() => {
    
    console.log('> Database connected')

    require('./routes')(app);
    app.listen(process.env.PORT || 3000);

  }).catch(err => {
    
    console.error('> Unable to connect to the database!');

    if(CONNECTION_ATTEMPTS > 0) {
      
      // Retry connection
      console.info('Retrying in 1 second')
      CONNECTION_ATTEMPTS--;
      setTimeout(() => {
        startApplication()
      }, 1000)

    } else {

      // Can't connect to database
      console.error(err);
      process.exit(1);

    }

  });

};

startApplication()
