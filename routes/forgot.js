var express = require('express');
var router = express.Router();
var Db = require('mongodb').Db;

const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL;
// Database Name
const dbName = 'deals-data';
// Create a new MongoClient
const client = new MongoClient(url);

/* GET forgot listing. */
router.post('/', function(req, res, next) {
    var response = '';
    client.connect(function(err, db) {

        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('user-stuff');

        const query = { "email" : req.body.email };
        const update = {
            "$set": {
                "password": req.body["password"]
                }
            };
        // Find some documents
        collection.findOne( {"email": req.body["email"]}, function(err, results) {
            if(err || !results){
                return res.sendStatus(403);
            }
            else{
                collection.updateOne(query, update);
                return res.sendStatus(200);
            }
            db.close();
        });
    });
});

module.exports = router;
