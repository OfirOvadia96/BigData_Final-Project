// const express = require('express');
// const app = express();
// var server = require('http').createServer(app);
// const io = require("socket.io")(server);
// // const mongodb = require('./models/MongoDB/consumeToMongoDB');

// // const controllerRouter = require('./routes/controller');

// app.set('view engine', 'ejs')
// app.use(express.static('public'));

// // app.use('/', controllerRouter);

// app.get('/', (req, res) => {
//     res.render('index', {data: "result"})
// });

// //--- Socket.io ----------------
// io.on("connection", (socket) => {
//     socket.on('Train', (msg) => { 
//         // BigML.createModel(); 
//         console.log(msg);
//     });
// });

// // can set PORT to be other num (By the command: set PORT=number)
// const myPort = process.env.PORT || 2300;
// //(Port, Function that called when the app start listen)
// app.listen(myPort, () =>  console.log(`Listening on port ${myPort} : http://localhost:${myPort}`)); //http://localhost:PortNumber


const express = require('express');
const app = express();
var server = require('http').createServer(app);
const io = require("socket.io")(server);
const BigML = require('./models/bigML/bml');
var fs = require("fs");
// const kafka = require("../kafka/PublishToKafka/publish")

const port = 3010

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//----------------------------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

//--------------------
app.get('/', (req, res) => {
    res.render('index', {data: "result"})
})

//-------- Socket.io ----------------
io.on("connection", (socket) => {

    socket.on("Train", (msg) => {  
        var res = BigML.createModel();
        setTimeout(function(){
            console.log("testtttt:" + res);
            socket.emit("Model", res);
        }, 10000);
    });

    socket.on('Predict', (msg) => 
        {BigML.predict({"id": "4591928","firstName": "Joy","lastName": "Goodwin","phone": "(555)","city": "Ashkelon","gender": "Female","age": 23,"prevCalls": 50,"totalTime": 50.946})
        setTimeout(function(){
            fs.readFile('predict.txt', 'utf8', function(err, data){
                socket.emit("Prediction", data);
            });
        }, 5000);
    });

});

server.listen(port, () => console.log(`BigML app listening at http://localhost:${port}`));

