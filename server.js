// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { connectToDatabase, closeDatabaseConnection } = require('./db');
const routes = require('./Routes/routes');

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/', routes); // Use your routes module

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
