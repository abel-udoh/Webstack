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
  const { client, collection } = await connectToDatabase();

  try {
    const user = {
      email: email,
      password: password,
    };

    const result = await collection.insertOne(user);
    console.log(`User inserted with ID: ${result.insertedId}`);
  } finally {
    await client.close();
  }
}

module.exports = { insertUser };
