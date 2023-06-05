const express = require("express");

module.exports = function (db) {
  const router = express.Router();
  let carts = db.collection("carts");

  router.post("/addToCart", async (req, res) => {
    try {
      const { userId, itemId } = req.body;

      // Make sure the cart exists for the user
      let userCart = await carts.findOne({ userId });
      if (!userCart) {
        // Cart doesn't exist, create one
        await carts.insertOne({ userId, items: [] });
        userCart = await carts.findOne({ userId });
      }

      // Add item to cart
      const result = await carts.updateOne(
        { userId },
        { $push: { items: itemId } }
      );

      if (result.modifiedCount > 0) {
        res.send({
          success: true,
          message: "Item added to cart successfully",
        });
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error adding item to cart");
    }
  });

  router.get("/getCart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      // Retrieve the user's cart
      const userCart = await carts.findOne({ userId });

      if (userCart) {
        // Now fetch items' details
        let itemsDetails = [];

        for (let itemId of userCart.items) {
          let item = null;

          // Loop through each collection until item is found
          const collections = [
            "furniture",
            "clothing",
            "household",
            "movies",
            "games",
            "toys",
            "groceries",
          ];

          for (let collectionName of collections) {
            const collection = db.collection(collectionName);
            item = await collection.findOne({ id: itemId });

            // If item is found, break the loop
            if (item) break;
          }

          if (item) {
            itemsDetails.push(item);
          }
        }

        // Return items' details instead of ids
        res.send({
          success: true,
          cart: { ...userCart, items: itemsDetails },
        });
      } else {
        res.send({ success: false, message: "No cart found for this user" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("Error retrieving cart");
    }
  });

  return router;
};
