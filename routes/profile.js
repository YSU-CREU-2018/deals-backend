var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL;
// Database Name
const dbName = 'deals-data';
// Create a new MongoClient
const client = new MongoClient(url);

/* GET profile listing. */
router.get('/:user_id', function(req, res, next) {

    var response = '';

    // Use connect method to connect to the Server
    client.connect(function(err) {
      console.log("Connected successfully to server");

      const db = client.db(dbName);

      // Get the documents collection
      const collection = db.collection('user-stuff');
      // Find some documents
      collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs)
        response = docs;
        res.send(response);
      });
    });
});

module.exports = router;
