// db.js
require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const databaseName = 'kacmartDB';

let client;

async function connectToDatabase() {
  client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    const database = client.db(databaseName);
    const collection = database.collection('kacmart');
    return { client, collection };
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    throw error;
  }
}

async function closeDatabaseConnection() {
  try {
    await client.close();
    console.log('Disconnected from MongoDB Atlas');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    throw error;
  }
}

module.exports = { connectToDatabase, closeDatabaseConnection };
