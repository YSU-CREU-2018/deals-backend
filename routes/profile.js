var express = require('express');
var router = express.Router();
var cors = require('cors')

router.use(cors())


const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL;
// Database Name
const dbName = 'deals-data';
// Create a new MongoClient
const client = new MongoClient(url);

/* GET profile listing. */
router.get('/:id', function(req, res, next) {

    var response = '';

    // Use connect method to connect to the Server
    client.connect(function(err) {

      const db = client.db(dbName);

      // Get the documents collection
      const collection = db.collection('user-stuff');
      // Find some documents
      collection.find({'id' : req.params.id}).toArray(function(err, docs) {
        response = docs;
        res.send(response);
      });
    });
});

module.exports = router;
