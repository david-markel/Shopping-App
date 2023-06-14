module.exports = (db, ObjectId, bcrypt, jwt, secretKey) => {
  const express = require("express");
  const router = express.Router();
  let users = db.collection("users");

  router.post("/register", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
      if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "Missing required fields",
        });
      }

      const hashedPassword = bcrypt.hashSync(password, 8);

      const user = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        subscriptionPlan: "basic",
        address: {
          address1: "",
          address2: "",
          city: "",
          state: "",
          country: "",
          zipcode: "",
        },
      };

      const result = await users.insertOne(user);

      if (result.acknowledged) {
        const newUser = await users.findOne({ _id: result.insertedId });

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
      console.error("Error during user registration: ", err);

      if (err.code === 11000) {
        console.log("Email already exists, returning error response.");
        res
          .status(409)
          .json({ success: false, message: "Email already exists" });
      } else {
        console.log("Returning generic server error.");
        res
          .status(500)
          .json({ success: false, message: "Error registering user" });
      }
    }
  });

  router.post("/login", async (req, res) => {
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
        res.json({ auth: true, token });
      } else {
        res.status(401).json({ auth: false, token: null });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error logging in" });
    }
  });

  router.put("/updateUser", async (req, res) => {
    try {
      const {
        id,
        firstName,
        lastName,
        email,
        password,
        subscriptionPlan,
        address,
      } = req.body;

      let updatedFields = {};

      if (firstName !== undefined) updatedFields.firstName = firstName;
      if (lastName !== undefined) updatedFields.lastName = lastName;
      if (email !== undefined) updatedFields.email = email;
      if (password !== undefined) {
        updatedFields.password = bcrypt.hashSync(password, 8); // hash the password only if provided
      }
      if (subscriptionPlan !== undefined)
        updatedFields.subscriptionPlan = subscriptionPlan;
      if (address !== undefined) updatedFields.address = address;

      if (Object.keys(updatedFields).length === 0) {
        return res.json({ success: false, message: "No changes were made" });
      }

      const result = await users.updateOne(
        { _id: new ObjectId(id) },
        { $set: updatedFields }
      );

      if (result.modifiedCount > 0) {
        const updatedUserFromDB = await users.findOne({
          _id: new ObjectId(id),
        });
        const token = jwt.sign(
          {
            id: updatedUserFromDB._id,
            firstName: updatedUserFromDB.firstName,
            lastName: updatedUserFromDB.lastName,
            email: updatedUserFromDB.email,
            subscriptionPlan: updatedUserFromDB.subscriptionPlan,
            address: updatedUserFromDB.address,
          },
          secretKey,
          { expiresIn: 86400 } // expires in 24 hours
        );
        res.json({ success: true, message: token });
      } else {
        throw new Error("User update failed");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error updating user" });
    }
  });

  router.delete("/deleteUser/:id", async (req, res) => {
    try {
      const { id } = req.params;

      const result = await users.deleteOne({
        _id: new ObjectId(id),
      });

      if (result.deletedCount > 0) {
        res.json({ success: true, message: "User deleted successfully" });
      } else {
        throw new Error("User deletion failed");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Error deleting user" });
    }
  });

  router.post("/validatePassword", async (req, res) => {
    const { id, password } = req.body;
    try {
      const user = await users.findOne({ _id: new ObjectId(id) });

      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ success: true });
      } else {
        res.json({ success: false });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  return router;
};
