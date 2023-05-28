const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
app.use(cors());
const port = 3000;
const dbUrl =
  "mongodb+srv://davidlmarkel:gd5HgmtbcNA6gxRB@cluster0.d439ezl.mongodb.net/";

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log("Connected successfully to mongodb");

    // Assuming "myNewDatabaseName" is the name of your database
    const db = client.db("markelo");

    app.get("/getAllItems", async (req, res) => {
      try {
        let items = [];
        const collections = [
          "furniture",
          "clothing",
          "household",
          "movies",
          "games",
          "toys",
          "groceries",
        ];

        for (const collection of collections) {
          const collItems = await db.collection(collection).find({}).toArray();
          items = items.concat(collItems);
        }

        res.send(items);
      } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving items from database");
      }
    });

    app.get("/getItemsCategory/:category", async (req, res) => {
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
  .catch((err) => {
    console.error("Error:", err);
  });
