var express = require('express');
var router = express.Router();

/* GET login listing. */
router.post('/', function(req, res, next) {
    const MongoClient = require('mongodb').MongoClient;

    // Connection URL
    const url = process.env.MONGO_DB_URL;
    // Database Name
    const dbName = 'deals-data';
    // Create a new MongoClient
    const client = new MongoClient(url, { useNewUrlParser: true });

    var response = '';
    // Use connect method to connect to the Server
    client.connect(function(err) {

        console.log(err);

        const db = client.db(dbName);

        // Get the documents collection
        db.collection('user-stuff').findOne(
            {
                "email": req.body["email"],
                "password": req.body["password"]
            },
            function(err, results) {
                if(err || !results){
                    client.close();
                    return res.sendStatus(403);
                }else{
                    collection.find(
                        {'email' : req.body.email},
                        function(err, response){
                            response.toArray(function(err, docs) {
                                response = docs;
                                client.close();
                                console.log(res);
                                res.send(response);
                            });
                        }
                    )
                }
            }
        );
    });
});
module.exports = router;
