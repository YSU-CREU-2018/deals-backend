var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL;
// Database Name
const dbName = 'deals-data';
// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

/* GET login listing. */
router.post('/', function(req, res, next) {
    var response = '';
    // Use connect method to connect to the Server
    client.connect(function(err) {

        console.log(err);

        const db = client.db(dbName);

        // Get the documents collection
        const collection = db.collection('user-stuff');
        // Find some documents
        collection.findOne( {"email": req.body["email"], "password": req.body["password"]}, function(err, results) {
            if(err || !results){
                return res.sendStatus(403);
            }
            else{
                collection.find({'email' : req.body.email}).toArray(function(err, docs) {
                    response = docs;
                    console.log(res);
                    res.send(response);
                });
            }
            // db.close();
        });
    });
});
module.exports = router;
