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
var fs = require("fs");
const BigML = require('./models/bigML/bml');
const kafka = require("../kafka/ConsumeFromKafka/consume");
const callDetails = require('./models/MongoDB/schemaTable');

const port = 3245

// const bodyParser = require('body-parser');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// //----------------------------------------

app.set('view engine', 'ejs');
app.use(express.static("public"));

//------------Consumer from Kafka-----------------
var newcall = "Waiting for new call...";

kafka.consumer.on("data", (msg) => {
    
    if(String(msg.value).includes("topic")){ //Data for MongoDB

        const call = new callDetails(JSON.parse(msg.value));
        //Enter call details to DB
        call.save().then(() => console.log("Inserted to MongoDB"))
        .catch((err) => console.log(err));

    }else{ //Data for predict in BigML
        newcall = msg.value;
    }

});

//----------------------------------------

app.get('/', (req, res) => {
    res.render('index', {data: newcall})
})

//-------- Socket.io ----------------
io.on("connection", (socket) => {

    socket.on("Train", (msg) => {  
        var res = BigML.createModel();
        setTimeout(function(){
            socket.emit("Model", res);
        }, 10000);
    });

    socket.on('Predict', (msg) => 
        // {BigML.predict({"id": "4591928","firstName": "Joy","lastName": "Goodwin","phone": "(555)","city": "Ashkelon","gender": "Female","age": 23,"prevCalls": 10,"totalTime": 50.946});
        {BigML.predict(newcall);
        setTimeout(function(){
            fs.readFile('predict.txt', 'utf8', function(err, data){
                socket.emit("Prediction", data);
            });
        }, 5000);
    });

});

server.listen(port, () => console.log(`BigML app listening at http://localhost:${port}`));

