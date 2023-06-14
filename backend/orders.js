module.exports = (db, ObjectId) => {
  const express = require("express");
  const router = express.Router();

  // Create a new order
  router.post("/createOrder", async (req, res) => {
    const { userId, items, totalCost, address, customerName } = req.body;

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

    try {
      console.log("In try block");
      // Insert the new order into the database
      const result = await db.collection("orders").insertOne(newOrder);
      console.log("result: ", result);
      if (result.acknowledged) {
        try {
          console.log("In try block of delte part");
          // Delete the user's cart after the order has been successfully created
          const cartResult = await db
            .collection("carts")
            .deleteOne({ userId: userId });

          console.log("cart result:", cartResult);
          console.log("Based on this userID: ", userId);
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
  });

  router.put("/updateOrderStatus/:orderId", async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;

    const result = await db
      .collection("orders")
      .updateOne({ _id: new ObjectId(orderId) }, { $set: { status } });

    if (result.modifiedCount > 0) {
      res.json({ success: true, message: "Order status updated successfully" });
    } else {
      res.json({ success: false, message: "Failed to update order status" });
    }
  });

  return router;
};
