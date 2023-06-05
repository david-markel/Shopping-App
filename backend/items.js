const express = require("express");

module.exports = function (db) {
  const router = express.Router();

  router.get("/getAllItems", async (req, res) => {
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

  router.get("/getItemsCategory/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const items = await db.collection(category).find({}).toArray();

      res.send(items);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving items from database");
    }
  });

  router.get("/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const collections = [
        "clothing",
        "furniture",
        "games",
        "groceries",
        "household",
        "movies",
        "toys",
      ];
      let results = [];

      for (const collection of collections) {
        const searchResults = await db
          .collection(collection)
          .find({ $text: { $search: query } })
          .toArray();
        results = results.concat(searchResults);
      }

      res.send(results);
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving items from database");
    }
  });

  router.get("/just-for-you", async (req, res) => {
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

      // Shuffle items
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }

      // Return only the first 9 items
      res.send(items.slice(0, 9));
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving items from database");
    }
  });

  return router;
};
