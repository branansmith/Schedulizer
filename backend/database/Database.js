const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://smithbranan:ZobbGU8ljSo5psXD@schedulizer.6uxow.mongodb.net/?retryWrites=true&w=majority&appName=Schedulizer";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



const Database = {

  async run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
      console.log(error);
    }
  },

  async getEmployeeTimes(date) {
    const database = client.db("Schedulizer");
    const collection = database.collection("ScheduleData");

    const query = { _id: date };
    const employeeInformation = collection.find(query);

    const results = await employeeInformation.toArray();

    if ((await collection.countDocuments(query)) === 0) {

      console.log("No documents found!");

    }

    return results;
  },

  async insertDocument(document) {
    try {
      await client.connect();

      const database = client.db("Schedulizer");
      const collection = database.collection("ScheduleData");
      // Iterate over each document in the array and perform upsert (insert or update)
      const operations = document.map(doc => {
        return {
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: doc },
            upsert: true
          }
        };
      });

      const result = await collection.bulkWrite(operations);
      console.log(`${result.upsertedCount} documents inserted, ${result.modifiedCount} documents updated`);
    } catch (error) {
      console.log(error);
    }
  }


};

module.exports = Database;