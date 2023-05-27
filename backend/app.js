const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const dbUrl = 'mongodb://localhost:27017';

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

client.connect()
  .then(() => {
    console.log("Connected successfully to mongodb");

    // Assuming "markelo" is the name of your database
    const db = client.db("markelo");

    app.get('/getAllItems', async (req, res) => {
      try {
        let items = [];
        const collections = ['furniture', 'clothing', 'household']; // add all your seven collections here

        for(const collection of collections) {
          const collItems = await db.collection(collection).find({}).toArray();
          items = items.concat(collItems);
        }

        res.send(items);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from database");
      }
    });

    app.get('/getItemsCategory/:category', async (req, res) => {
      try {
        const category = req.params.category;
        const items = await db.collection(category).find({}).toArray();

        res.send(items);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from database");
      }
    });

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error:', err);
  });
