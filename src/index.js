const express = require('express');
const app = express();
const sequelize = require('./sequelize')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


var CONNECTION_ATTEMPTS = 60;

async function startApplication() {

  // Connect to database before listening to requests
  sequelize.authenticate().then(async () => {
    
    console.log('> Database connected')
    require('./routes')(app);

    // Sync database structure with models
    try {
      require('./models')
      // Force = recreate db tables
      await sequelize.sync({ force: true });
    } catch(e) {
      console.error('error: ', e)
    }

    let port = process.env.PORT || 3000
    console.log(`> Listening at port ${port}`)
    app.listen(port);

  }).catch(err => {
    
    console.error('> Unable to connect to the database!');

    if(CONNECTION_ATTEMPTS > 0) {
      
      // Retry connection
      console.info('Retrying in 5 seconds')
      CONNECTION_ATTEMPTS--;
      setTimeout(() => {
        startApplication()
      }, 5000)

    } else {

      // Can't connect to database
      console.error(err);
      process.exit(1);

    }

  });

};

startApplication()
