process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

console.log("Starting script...");

// Read the JSON file
const data = JSON.parse(fs.readFileSync('../frontend/src/assets/items/games.json', 'utf8'));

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'markelo';

console.log("Creating MongoClient...");

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

console.log("Connecting to MongoDB...");

client.connect()
  .then(() => {
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('clothing');

    return collection.insertMany(data.clothing);
  })
  .then(() => {
    console.log("Inserted documents into the collection");
    client.close();
  })
  .catch(err => {
    console.error('Error:', err);
    client.close();
  });
