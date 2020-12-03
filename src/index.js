const express = require("express");
const serverless = require("serverless-http");
const app = express();

const body_parser = require("body-parser");

// parse JSON (application/json content-type)
app.use(body_parser.json());

const port = 4000;
const router = express.Router();
app.use('/.netlify/functions/index',router);

// << db setup >>
const db = require("./db");
const dbName = "GenshinData";
const collectionName = "PlayableCharacters";

// << db init >>
db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

    // << db CRUD routes >>
    router.get("/characters", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
}, function(err) { // failureCallback
    throw (err);
});

const collectionName2 = "Weapons";

db.initialize(dbName, collectionName2, function(dbCollection) { // successCallback
    // get all items
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
          console.log(result);
    });

    // << db CRUD routes >>
    router.get("/weapons", (request, response) => {
        // return updated list
        dbCollection.find().toArray((error, result) => {
            if (error) throw error;
            response.json(result);
        });
    });
}, function(err) { // failureCallback
    throw (err);
});

router.get("/", (request, response) => {
    response.json({message: "Nothing Here"});
});

// router.listen(port, () => {
//     console.log(`app listening at ${port}`);
// });

module.exports.handler = serverless(app);