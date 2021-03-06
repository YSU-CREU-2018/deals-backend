var express = require('express');
var router = express.Router();

/* GET profile listing. */
router.get('/', function(req, res, next) {

    /* GET deals listing. */
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = process.env.MONGO_DB_URL;
    // Database Name
    const dbName = 'deals-data';
    // Create a new MongoClient
    const client = new MongoClient(url);

    var response = '';

    // Use connect method to connect to the Server
    client.connect(function(err, client) {
        const db = client.db(dbName);
        // Get the documents collection
        db.collection('recommender-site').aggregate(
            [{ $sample: { size: 50} }],
            function(err, response){
                response.toArray(function(err, docs) {
                    response = docs;
                    client.close();

                    res.send(response);
                });
            }
        )
    });
});

//will not need we cut this out but i am keeping it for safekeeping
// router.get('/rated/:user_id', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/:deal_id', function(req, res, next) {

    /* GET deals listing. */
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = process.env.MONGO_DB_URL;
    // Database Name
    const dbName = 'deals-data';
    // Create a new MongoClient
    const client = new MongoClient(url);

    var response = '';
    // Use connect method to connect to the Server
    client.connect(function(err) {

        const db = client.db(dbName);
        const query = { "email" : req.body.email };
        const update = {
            "$addToSet": {
                "ratedDeal": {
                    "deal": req.body["deal"],
                    "rating" : req.body.rating
                }
            }
        };
        // Get the documents collection
        db.collection('user-stuff').updateOne(
            query,
            update,
            function(err){
                if(err){
                    client.close();
                    return res.sendStatus(403);
                }else{
                    client.close();
                    return res.sendStatus(200);
                }
            }
        )
    });
});

module.exports = router;
