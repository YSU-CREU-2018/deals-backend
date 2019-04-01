var express = require('express');
var router = express.Router();


/* GET deals listing. */
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = process.env.MONGO_DB_URL;
// Database Name
const dbName = 'deals-data';
// Create a new MongoClient
const client = new MongoClient(url);

/* GET profile listing. */
router.get('/', function(req, res, next) {

    var response = '';

    // Use connect method to connect to the Server
    client.connect(function(err) {

      const db = client.db(dbName);
      // Get the documents collection
      const collection = db.collection('recommender-site');
      // Find some documents
      collection.aggregate([{ $sample: { size: 50} }]).toArray(function(err, docs) {
        response = docs;
        res.send(response);
      });
    });
});
//will not need we cut this out but i am keeping it for safekeeping
// router.get('/rated/:user_id', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/:deal_id', function(req, res, next) {

    var response = '';
    // Use connect method to connect to the Server
    client.connect(function(err) {

        const db = client.db(dbName);
        // Get the documents collection
        const collection = db.collection('user-stuff');

        const query = { "email" : req.body.email };
        const update = {
            "$addToSet": {
                "ratedDeal": {
                    "deal": req.body["deal"],
                    "rating" : req.body.rating
                }
            }
        };
        collection.updateOne(query, update).then(result => {
            if(err)
                return res.sendStatus(403);
            else{
                return res.sendStatus(200);
            }
        });
    });
});

module.exports = router;
