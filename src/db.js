// mongodb driver
const MongoClient = require("mongodb").MongoClient;

function initialize(
    dbName,
    dbCollectionName,
    successCallback,
    failureCallback
) {

    const dbConnectionUrl = `mongodb+srv://agrim:testpassword@cluster0.yfybk.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    MongoClient.connect(dbConnectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, dbInstance) {
        if (err) {
            // console.log(`[MongoDB connection] ERROR: ${err}`);
            // failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);
            console.log("[MongoDB connection] SUCCESS");
            console.log(dbObject);

            successCallback(dbCollection);
        }
    });
}

module.exports = {
    initialize
};