const express = require("express");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.SECRET_KEY;

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;
const dbUrl =
  "mongodb+srv://davidlmarkel:gd5HgmtbcNA6gxRB@cluster0.d439ezl.mongodb.net/";

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

client
  .connect()
  .then(() => {
    console.log("Connected successfully to mongodb");

    const db = client.db("markelo");
    const users = db.collection("users"); // Assuming "users" is your users collection

    app.post("/register", async (req, res) => {
      try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8); // hash the password
        const user = {
          firstName,
          lastName,
          email,
          password: hashedPassword,
          subscriptionPlan: "free",
          address: {
            address1: "",
            address2: "",
            city: "",
            state: "",
            country: "",
            zipcode: "",
          },
        };

        // Insert new user
        const result = await users.insertOne(user);

        // If insert was successful, result.ops[0] will contain the newly created user document
        if (result.ops[0]) {
          const newUser = result.ops[0];
          const token = jwt.sign(
            {
              id: newUser._id,
              firstName: newUser.firstName,
              lastName: newUser.lastName,
              email: newUser.email,
              subscriptionPlan: newUser.subscriptionPlan,
              address: newUser.address,
            },
            secretKey,
            { expiresIn: 86400 } // expires in 24 hours
          );
          res.send({ success: true, message: token });
        } else {
          throw new Error("User registration failed");
        }
      } catch (err) {
        console.error(err);

        // Catch the MongoDB error when email already exists
        if (err.code === 11000) {
          res
            .status(409)
            .send({ success: false, message: "Email already exists" });
        } else {
          res.status(500).send("Error registering user");
        }
      }
    });

    app.post("/login", async (req, res) => {
      try {
        const { email, password } = req.body;
        const user = await users.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
          // passwords match, generate a token
          const token = jwt.sign(
            {
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              subscriptionPlan: user.subscriptionPlan,
              address: user.address,
            },
            secretKey,
            { expiresIn: 86400 } // expires in 24 hours
          );
          res.send({ auth: true, token });
        } else {
          res.status(401).send({ auth: false, token: null });
        }
      } catch (err) {
        console.error(err);
        res.status(500).send("Error logging in");
      }
    });

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
