const MongoClient = require("mongodb").MongoClient;
const dbUrl =
  "mongodb+srv://davidlmarkel:gd5HgmtbcNA6gxRB@cluster0.d439ezl.mongodb.net/";

const client = new MongoClient(dbUrl, { useUnifiedTopology: true });

// Collections to update
const collections = [
  "clothing",
  "furniture",
  "games",
  "groceries",
  "household",
  "movies",
  "toys",
];

// Connect to the MongoDB client
client
  .connect()
  .then(async () => {
    console.log("Connected successfully to mongodb");
    const db = client.db("markelo"); // Replace 'markelo' with your database name if different

    // Loop over each collection
    for (const collection of collections) {
      const collectionRef = db.collection(collection);

      // Your code to update documents goes here
      const items = await collectionRef.find().toArray();

      for (const item of items) {
        if (!item.collectionName) {
          await collectionRef.updateOne(
            { _id: item._id },
            { $set: { collectionName: collection } }
          );
          console.log(
            `Added collection reference to item in collection: ${collection}`
          );
        } else {
          console.log(
            `Item in collection: ${collection} already has collection reference`
          );
        }
      }
    }

    // Close the MongoDB client
    client.close();
  })
  .catch((err) => {
    console.error("Error:", err);
    client.close();
  });
