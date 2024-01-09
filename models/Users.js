/*// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;
*/
// models/User.js
const { connectToDatabase } = require('../db');

async function insertUser(email, password) {
  const { collection } = await connectToDatabase();

  try {
    const user = {
      email: email,
      password: password,
    };

    const result = await collection.insertOne(user);
    console.log(`User inserted with ID: ${result.insertedId}`);
  } finally {
  }
}

  async function findUserByEmail(email) {
    const { collection } = await connectToDatabase();
    return collection.findOne({ email });
  }

  module.exports = { insertUser, findUserByEmail };
