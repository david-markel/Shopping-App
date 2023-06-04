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

      // Drop existing text index if it exists
      try {
        await collectionRef.dropIndex("title_text");
        console.log(
          `Dropped existing text index for collection: ${collection}`
        );
      } catch (err) {
        console.log(
          `No existing text index to drop in collection: ${collection}`
        );
      }

      // Create new text index on 'title' and 'description'
      await collectionRef.createIndex({ title: "text", description: "text" });
      console.log(`Created text index for collection: ${collection}`);

      // Your code to update documents goes here
      // ...
    }

    // Close the MongoDB client
    client.close();
  })
  .catch((err) => {
    console.error("Error:", err);
    client.close();
  });
