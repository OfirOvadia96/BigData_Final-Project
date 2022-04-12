const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
var db = require('./mysql');
// const kafka = require("../kafka/PublishToKafka/publish")

const port = 3027

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------------------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));


// db.query("SELECT * FROM users ORDER BY RAND() LIMIT 1;", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
// });

//------- Client side - Call Generator ------------------
app.get('/', (req, res) => {
    db.query("SELECT * FROM users;", function (err, result, fields) {
        if (err) throw err;
        // console.log(result);
        res.render('index', {data: result})
    });
})

//--- Socket.io - Produce call details to kafka ----------------
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { console.log(msg.totalWaiting) });
    // socket.on("callDetails", (msg) => { kafka.publish(msg) });
});

server.listen(port, () => console.log(`Call Generator app listening at http://localhost:${port}`));


