const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017/donate";
const client = new MongoClient(uri);

async function run() { 
  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("testDB");
    const collection = db.collection("users");

    // Insert Sample Data (if collection is empty)
    const existingUsers = await collection.find({}).toArray();
    if (existingUsers.length === 0) {
      await collection.insertMany([
        { name: "John Doe", age: 30, bloodGroup: "O+", location: "New York" },
        { name: "Jane Smith", age: 25, bloodGroup: "A-", location: "Chicago" }
      ]);
      console.log("Sample users inserted!");
    }

    // Retrieve & Display Data
    const users = await collection.find({}).toArray();
    console.log("All Users:", users);
  } catch (error) {
    console.error("MongoDB Error:", error);
  }
}

run();