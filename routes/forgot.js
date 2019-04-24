var express = require('express');
var router = express.Router();

/* GET forgot listing. */
router.post('/', function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = process.env.MONGO_DB_URL;
    // Database Name
    const dbName = 'deals-data';
    // Create a new MongoClient
    const client = new MongoClient(url);

    var response = '';
    client.connect(function(err) {

        const db = client.db(dbName);
        const query = { "email" : req.body.email };
        const update = {
            "$set": {
                "password": req.body["password"]
                }
            };
        // Get the documents collection
        db.collection('user-stuff').findOne(
            {"email": req.body["email"]},
            function(err, results) {
                if(err || !results){
                    client.close();
                    return res.sendStatus(403);
                }else{
                    collection.updateOne(
                        query,
                        update,
                        function(err, response){
                            client.close();
                            return res.sendStatus(200);
                        }
                    );
                }
            }
        );
    });
});

module.exports = router;
