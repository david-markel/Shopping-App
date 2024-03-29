const express = require("express");

module.exports = function (db, ObjectId) {
  const router = express.Router();
  let carts = db.collection("carts");

  router.post("/addToCart", async (req, res) => {
    try {
      const { userId, itemId, collectionName } = req.body;

      if (!userId || !itemId || !collectionName) {
        return res.status(400).send({
          success: false,
          message: "Missing required fields",
        });
      }

      // Make sure the cart exists for the user
      let userCart = await carts.findOne({ userId });
      if (!userCart) {
        // Cart doesn't exist, create one
        await carts.insertOne({ userId, items: [] });
        userCart = await carts.findOne({ userId });
      }

      // Add item to cart with collection name
      const result = await carts.updateOne(
        { userId },
        { $push: { items: { itemId, collectionName } } }
      );

      if (result.modifiedCount > 0) {
        return res.send({
          success: true,
          message: "Item added to cart successfully",
        });
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: "Error adding item to cart",
      });
    }
  });

  router.get("/getCart/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      if (!userId) {
        return res.status(400).send({
          success: false,
          message: "Missing required fields",
        });
      }

      // Retrieve the user's cart
      const userCart = await carts.findOne({ userId });

      if (userCart) {
        // Now fetch items' details
        let itemsDetails = [];

        for (let itemInfo of userCart.items) {
          const { itemId, collectionName } = itemInfo;

          const collection = db.collection(collectionName);
          const item = await collection.findOne({ _id: new ObjectId(itemId) });

          if (item) {
            itemsDetails.push(item);
          } else {
            console.log(`Item not found for itemId: ${itemId}`);
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
      res.status(500).send({
        success: false,
        message: "Error retrieving cart",
      });
    }
  });

  router.delete("/removeFromCart", async (req, res) => {
    try {
      const { userId, itemId } = req.body;

      if (!userId || !itemId) {
        return res.status(400).send({
          success: false,
          message: "Missing required fields",
        });
      }

      // Remove item from the user's cart
      const result = await carts.updateOne(
        { userId },
        { $pull: { items: { itemId } } }
      );

      if (result.modifiedCount > 0) {
        res.send({
          success: true,
          message: "Item removed from cart successfully",
        });
      } else {
        throw new Error("Failed to remove item from cart");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        success: false,
        message: "Error removing item from cart",
      });
    }
  });

  return router;
};
