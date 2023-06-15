const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const dbUrl = process.env.DB_URL;

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "dist/frontend")));
  app.get("/*", function (req, res, next) {
    if (req.originalUrl.startsWith("/api")) {
      // Pass the request to the next middleware
      next();
    } else {
      // Serve the Angular application
      res.sendFile(path.join(__dirname, "dist/frontend/index.html"));
    }
  });
}

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });
let db;

client
  .connect()
  .then(() => {
    console.log("Connected successfully to mongodb");

    db = client.db("markelo");

    const userRoutes = require("./users")(db, ObjectId, bcrypt, jwt, secretKey);
    const itemRoutes = require("./items")(db);
    const cartRoutes = require("./carts")(db, ObjectId);
    const orderRoutes = require("./orders")(db, ObjectId);

    app.use("/api", userRoutes);
    app.use("/api", itemRoutes);
    app.use("/api", cartRoutes);
    app.use("/api", orderRoutes);

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
