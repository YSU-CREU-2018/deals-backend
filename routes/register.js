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

/* GET register listing. */
router.post('/', function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", 'http://www.dealbunny.dev/register/');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');

    req.body.rated = [];
    req.body.rated.ratedDeal = {};

    // Use connect method to connect to the Server
    client.connect(function(err) {

        const db = client.db(dbName);

        // Get the documents collection
        const collection = db.collection('user-stuff');
        // Find some documents
        collection.insertOne(req.body);

        if(err)
            return res.send('403');
        else{
            return res.send('200');
        }
    });
});

module.exports = router;
