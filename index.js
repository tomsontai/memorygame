let express = require("express");
const app = express();

let bodyParser = require('body-parser');

const port = process.env.PORT ||  3000;

app.use('/', express.static(__dirname));

app.listen(port, () => console.log("Server is ready at 3000"));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
// const express = require("express");
const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");
// const app = express();
// const router = express.Router();
// const path = require('path');

const uri = "mongodb+srv://tomsontai:Hexadecimal1%21@cluster0-8wth4.mongodb.net/test?retryWrites=true&w=majority";


  

// app.use('/', router);



//Middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());

// //Node server port
// const port = process.env.PORT || 8080;

//DB client
const client = new MongoClient(uri, { useNewUrlParser: true });

//DB name
const databaseName = "memoryGameDB";

//Collection name
const collectionName = "playerScore";

app.get('/scores', (req, res) => {
    client.connect((err) => {
        assert.equal(null, err);
        console.log("DB connection established.");
        const collection = client.db(databaseName).collection(collectionName);

        collection.find({}, { sort: { score: -1 } }).toArray((err, data) => {
            if (err) {
                console.log("get error");
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("get successful");
                res.json(data);
            }
        });
    });
});

app.post('/scores', (req, res) => {
    client.connect((err) => {
        assert.equal(null, err);
        console.log("DB connection established.");
        const db = client.db(databaseName);
        
        db.collection(collectionName).insertOne(req.body, (err) => {
            if (err) {
                console.log("post error");
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log("post successful");
                res.sendStatus(200);
            }
        });
    });
});

// app.get('/', function (req, res) {
//     res.render('./index', {});
// });

// app.listen(port, () => {
//     console.log(`Listening on port ${port}.`);
// });






// router.get('/',function(req,res){
//     res.sendFile(path.join(__dirname + '/index.html'));
//     //__dirname : It will resolve to your project folder.
// });

// router.get('/summary',function(req,res){
//     res.sendFile(path.join(__dirname+'/summary.html'));
// });

// router.get('/leaderboard',function(req,res){
//     res.sendFile(path.join(__dirname+'/leaderboard.html'));
// });