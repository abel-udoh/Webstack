require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const crypto = require('crypto');
const path = require('path');
const { connectToDatabase, closeDatabaseConnection } = require('./db');
const routes = require('./Routes/routes');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
const secretKey = crypto.randomBytes(32).toString('hex');
app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false
}));

// Configure Express to use HTML as the view engine
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

connectToDatabase()
  .then(() => {
    app.use('/', routes);

    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch(err => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
