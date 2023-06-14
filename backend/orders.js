module.exports = (db, ObjectId) => {
  const express = require("express");
  const router = express.Router();

  // Create a new order
  router.post("/createOrder", async (req, res) => {
    const { userId, items, totalCost, address, customerName } = req.body;

    try {
      if (!userId || !items || !totalCost || !address || !customerName) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      // Generate a new order
      const newOrder = {
        userId: new ObjectId(userId),
        items: items.map((item) => ({
          itemId: item._id,
          quantity: item.quantity,
        })), // map to only get itemId and quantity
        totalCost,
        address,
        status: "processing",
        created_at: new Date(),
        customerName,
      };

      // Insert the new order into the database
      const result = await db.collection("orders").insertOne(newOrder);

      if (result.acknowledged) {
        try {
          // Delete the user's cart after the order has been successfully created
          const cartResult = await db
            .collection("carts")
            .deleteOne({ userId: userId });

          if (cartResult.deletedCount === 0) {
            return res.json({
              success: false,
              message: "Failed to delete cart",
            });
          }

          res.json({
            success: true,
            message: "Order created successfully and cart deleted",
            order: result.ops[0],
          });
        } catch (err) {
          return res.json({
            success: false,
            message: `Error deleting cart: ${err.message}`,
          });
        }
      } else {
        res.json({ success: false, message: "Failed to create order" });
      }
    } catch (err) {
      res.json({
        success: false,
        message: `Error creating order: ${err.message}`,
      });
    }
  });

  router.get("/getOrders/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
      if (!userId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const orders = await db
        .collection("orders")
        .find({ userId: new ObjectId(userId) })
        .toArray();

      const categories = [
        "groceries",
        "clothing",
        "household",
        "toys",
        "games",
        "movies",
        "furniture",
      ];

      // Transform 'itemId's back to item details
      for (let order of orders) {
        for (let item of order.items) {
          let itemDetails = null;
          for (let category of categories) {
            itemDetails = await db
              .collection(category)
              .findOne({ _id: new ObjectId(item.itemId) });
            if (itemDetails) {
              break;
            }
          }

          if (itemDetails) {
            item.title = itemDetails.title;
            item.price = itemDetails.price;
          } else {
            console.error(
              `Item with id ${item.itemId} not found in any category`
            );
          }
        }
      }

      res.json({ success: true, orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error retrieving orders from database",
      });
    }
  });

  router.put("/updateOrderStatus/:orderId", async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;

    try {
      if (!status || !orderId) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const result = await db
        .collection("orders")
        .updateOne({ _id: new ObjectId(orderId) }, { $set: { status } });

      if (result.modifiedCount > 0) {
        res.json({
          success: true,
          message: "Order status updated successfully",
        });
      } else {
        res.json({ success: false, message: "Failed to update order status" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        success: false,
        message: "Error updating order status in the database",
      });
    }
  });

  return router;
};
