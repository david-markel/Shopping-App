const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;
const dbUrl = process.env.DB_URL;

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

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

    app.use(userRoutes);
    app.use(itemRoutes);
    app.use(cartRoutes);

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error:", err);
  });
